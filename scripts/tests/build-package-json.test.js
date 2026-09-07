const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { parse } = require("jsonc-parser");
const { buildPackageJson } = require("../build-package-json");

const packageJsonPath = path.join(__dirname, "../../package.json");
const originalPackageJsonPath = path.join(__dirname, "orig-package.json");
const testPackageJsonPath = path.join(__dirname, "test-package.json");
const configurationDir = path.join(__dirname, "../../src/configuration");

/**
 * Flatten a binding tree into a Map keyed by the full chain of "key"
 * values from the root to each node. Using the full chain (rather than
 * the bare leaf key) keeps entries unique even though the same key
 * (e.g. "0") can legitimately repeat in unrelated submenus.
 * @param {object[]} bindings A binding array
 * @param {string[]} parentKeys The chain of keys leading to this array
 * @returns {Map<string, object>} Map of JSON-encoded key chain to the node (without its children)
 */
function flattenBindings(bindings, parentKeys = []) {
    const flattened = new Map();

    for (const node of bindings) {
        const keyChain = [...parentKeys, node.key];
        const { bindings: children, ...leaf } = node;
        flattened.set(JSON.stringify(keyChain), leaf);

        if (Array.isArray(children)) {
            for (const [childPath, childLeaf] of flattenBindings(children, keyChain)) {
                flattened.set(childPath, childLeaf);
            }
        }
    }

    return flattened;
}

/**
 * Get a short human readable label for a flattened entry, e.g. "b > 0 (Last buffer)".
 * @param {string} keyChainJson The JSON-encoded key chain (Map key from flattenBindings)
 * @param {object} node The node stored for that key chain
 * @returns {string} A short description of the entry
 */
function describeEntry(keyChainJson, node) {
    const keyPath = JSON.parse(keyChainJson).join(" > ");
    return node.name ? `${keyPath} (${node.name})` : keyPath;
}

/**
 * Compare two flattened binding maps and collect a human readable list of
 * all differences (missing, unexpected or changed entries).
 * @param {Map<string, object>} expected Flattened original bindings
 * @param {Map<string, object>} actual Flattened generated bindings
 * @param {string} label A label describing the compared setting
 * @returns {string[]} A list of human readable differences
 */
function diffFlatBindings(expected, actual, label) {
    const differences = [];

    for (const [keyChainJson, node] of expected) {
        if (!actual.has(keyChainJson)) {
            differences.push(`Missing in generated: ${label} ${describeEntry(keyChainJson, node)}`);
        } else if (JSON.stringify(actual.get(keyChainJson)) !== JSON.stringify(node)) {
            differences.push(
                `Value differs at ${label} ${describeEntry(keyChainJson, node)}: generated ${JSON.stringify(actual.get(keyChainJson))}, original ${JSON.stringify(node)}`
            );
        }
    }

    for (const [keyChainJson, node] of actual) {
        if (!expected.has(keyChainJson)) {
            differences.push(`Unexpected in generated: ${label} ${describeEntry(keyChainJson, node)}`);
        }
    }

    return differences;
}

/**
 * Assert that the generated binding array contains exactly the same
 * bindings as the original one, regardless of order.
 * @param {object[]} originalDefault The original binding array
 * @param {object[]} generatedDefault The generated binding array
 * @param {string} label A label describing the compared setting
 */
function assertSameBindings(originalDefault, generatedDefault, label) {
    const differences = diffFlatBindings(
        flattenBindings(originalDefault),
        flattenBindings(generatedDefault),
        label
    );
    assert.deepStrictEqual(
        differences,
        [],
        `${label} should contain exactly the same bindings as the original package:\n${differences.join("\n")}`
    );
}

const sourceBefore = fs.readFileSync(packageJsonPath, "utf8");
const testPackage = buildPackageJson(packageJsonPath, configurationDir);
const originalPackage = parse(fs.readFileSync(originalPackageJsonPath, "utf8"));

fs.writeFileSync(testPackageJsonPath, `${JSON.stringify(testPackage, null, 4)}\n`);

const originalProperties = originalPackage.contributes.configuration[0].properties;
const testProperties = testPackage.contributes.configuration[0].properties;

for (const [propertyName, propertySchema] of Object.entries(originalProperties)) {
    if (!Array.isArray(propertySchema.default)) {
        continue;
    }
    assert.ok(testProperties[propertyName], `${propertyName} is missing from the generated package.json`);
    assertSameBindings(propertySchema.default, testProperties[propertyName].default, propertyName);
}

assert.deepStrictEqual(
    testPackage.contributes.keybindings,
    originalPackage.contributes.keybindings,
    "contributes.keybindings should match the original package"
);

assert.strictEqual(
    fs.readFileSync(packageJsonPath, "utf8"),
    sourceBefore,
    "Building a package object must not modify the source package"
);

console.log(`build-package-json test passed: ${testPackageJsonPath}`);


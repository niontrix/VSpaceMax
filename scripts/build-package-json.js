#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { parse } = require("jsonc-parser");

const projectRoot = path.resolve(__dirname, "..");
const packageJsonPath = path.join(projectRoot, "package.json");
const configurationDir = path.join(projectRoot, "src", "configuration");
const buildDir = path.join(projectRoot, "build");
const buildPackageJsonPath = path.join(buildDir, "package.json");

function ensureDirectory(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function readJsonc(filePath) {
    const raw = fs.readFileSync(filePath, "utf8");
    return parse(raw);
}

function writeJson(filePath, value) {
    fs.writeFileSync(filePath, `${JSON.stringify(value, null, 4)}\n`, "utf8");
}

function getConfigProperties(packageData) {
    return packageData.contributes.configuration[0].properties;
}

/**
 * Recursively collect all "*.jsonc" files in any folder named "bindings"
 * below the configuration directory.
 * @param {string} rootDir Directory to start the search from
 * @returns {string[]} Absolute paths of the discovered binding files
 */
function collectBindingFiles(rootDir) {
    const bindingFiles = [];

    function walk(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const entryPath = path.join(dir, entry.name);

            if (!entry.isDirectory()) {
                continue;
            }

            if (entry.name === "bindings") {
                for (const file of fs.readdirSync(entryPath)) {
                    if (file.endsWith(".jsonc")) {
                        bindingFiles.push(path.join(entryPath, file));
                    }
                }
                // Bindings are not nested, so do not descend further.
                continue;
            }

            walk(entryPath);
        }
    }

    if (fs.existsSync(rootDir)) {
        walk(rootDir);
    }

    return bindingFiles;
}

/**
 * Merge the discovered main binding files into a single binding tree.
 * Files that contain an array of bindings are flattened into the tree.
 * @param {string[]} filePaths Absolute paths of the discovered binding files
 * @returns {object[]} The merged binding entries
 */
function mergeMainBindings(filePaths) {
    const mergedBindings = [];

    for (const filePath of filePaths) {
        const bindings = readJsonc(filePath);
        if (Array.isArray(bindings)) {
            mergedBindings.push(...bindings);
        } else {
            mergedBindings.push(bindings);
        }
    }

    return mergedBindings;
}

// Char-code compare so control/whitespace keys (e.g. "\t", " ") sort before letters.
function compareByKey(a, b) {
    return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
}

/**
 * Sort a binding array by "key" and recurse into any nested "bindings" arrays.
 * @param {object[]} bindings A binding array
 * @returns {object[]} The same array, sorted in place at every level
 */
function sortBindingsByKey(bindings) {
    bindings.sort(compareByKey);
    for (const binding of bindings) {
        if (Array.isArray(binding.bindings)) {
            sortBindingsByKey(binding.bindings);
        }
    }
    return bindings;
}

function buildPackageJson(packageJsonInputPath, configurationRootDir = configurationDir) {
    const packageData = readJsonc(packageJsonInputPath);
    const properties = getConfigProperties(packageData);

    const bindingFiles = collectBindingFiles(configurationRootDir);

    for (const filePath of bindingFiles) {
        switch (path.basename(filePath)) {
            case "magit-ref-bindings.jsonc":
                properties["vspacecode.magitRefBindings"].default = sortBindingsByKey(readJsonc(filePath));
                break;
            case "magit-refresh-bindings.jsonc":
                properties["vspacecode.magitRefreshBindings"].default = sortBindingsByKey(readJsonc(filePath));
                break;
        }
    }

    const mainBindingFiles = bindingFiles.filter((filePath) => !path.basename(filePath).startsWith("magit-"));
    properties["vspacecode.bindings"].default = sortBindingsByKey(mergeMainBindings(mainBindingFiles));

    return packageData;
}

function buildPackageFile(packageJsonInputPath = packageJsonPath, outputPath = buildPackageJsonPath) {
    const packageData = buildPackageJson(packageJsonInputPath, configurationDir);
    ensureDirectory(path.dirname(outputPath));
    writeJson(outputPath, packageData);
    return outputPath;
}

function main() {
    const outputPath = buildPackageFile();
    console.log(`Built ${outputPath} from binding fragments in ${configurationDir}`);
}

if (require.main === module) {
    main();
}

module.exports = {
    buildPackageJson,
    buildPackageFile,
    collectBindingFiles,
    mergeMainBindings,
    sortBindingsByKey,
};

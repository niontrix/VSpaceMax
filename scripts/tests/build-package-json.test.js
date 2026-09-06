const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { parse } = require("jsonc-parser");
const { buildPackageJson } = require("../build-package-json");

const packageJsonPath = path.join(__dirname, "../../package.json");
const originalPackageJsonPath = path.join(__dirname, "orig-package.json");
const testPackageJsonPath = path.join(__dirname, "test-package.json");
const bindingsDir = path.join(__dirname, "../../src/configuration/bindings");

const sourceBefore = fs.readFileSync(packageJsonPath, "utf8");
const result = buildPackageJson(packageJsonPath, bindingsDir);
const originalPackage = parse(fs.readFileSync(originalPackageJsonPath, "utf8"));
const testPackage = result;

fs.writeFileSync(testPackageJsonPath, `${JSON.stringify(testPackage, null, 4)}\n`);

const originalProperties = originalPackage.contributes.configuration[0].properties;
const testProperties = testPackage.contributes.configuration[0].properties;

assert.deepStrictEqual(
	testProperties["vspacecode.bindings"].default,
	originalProperties["vspacecode.bindings"].default,
	"Generated VSpaceCode bindings should match the original package"
);
assert.deepStrictEqual(
	testProperties["vspacecode.magitRefBindings"].default,
	originalProperties["vspacecode.magitRefBindings"].default,
	"Generated Magit ref bindings should match the original package"
);
assert.deepStrictEqual(
	testProperties["vspacecode.magitRefreshBindings"].default,
	originalProperties["vspacecode.magitRefreshBindings"].default,
	"Generated Magit refresh bindings should match the original package"
);
assert.strictEqual(
	fs.readFileSync(packageJsonPath, "utf8"),
	sourceBefore,
	"Building a package object must not modify the source package"
);

console.log(`build-package-json test passed: ${testPackageJsonPath}`);

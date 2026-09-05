const assert = require("assert");
const path = require("path");
const { buildPackageJson } = require("./build-package-json");

const packageJsonPath = path.join(__dirname, "../package.json");
const bindingsDir = path.join(__dirname, "../src/configuration/bindings");

const result = buildPackageJson(packageJsonPath, bindingsDir);
const defaultBindings = result.contributes.configuration[0].properties["vspacecode.bindings"].default;

assert(Array.isArray(defaultBindings), "vspacecode.bindings.default should be an array");
assert(defaultBindings.some((entry) => entry.key === "b" && entry.name === "+Buffers"), "The +Buffers group should be included");
assert(defaultBindings.some((entry) => entry.key === "g" && entry.name === "+Git"), "The +Git group should be included");
assert(defaultBindings.some((entry) => entry.key === " " && entry.name === "Commands"), "The main Commands entry should be included");

const magitRefBindings = result.contributes.configuration[0].properties["vspacecode.magitRefBindings"].default;
assert(Array.isArray(magitRefBindings), "vspacecode.magitRefBindings.default should be an array");
assert(magitRefBindings.some((entry) => entry.command === "magit.show-refs"), "magit ref bindings should contain show refs");

console.log("build-package test passed");

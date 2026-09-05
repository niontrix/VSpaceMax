#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { parse } = require("jsonc-parser");

const projectRoot = path.resolve(__dirname, "..");
const packageJsonPath = path.join(projectRoot, "package.json");
const bindingDir = path.join(projectRoot, "src", "configuration", "bindings");

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

function toSlug(value) {
    return String(value || "root")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "root";
}

function getConfigProperties(packageData) {
    return packageData.contributes.configuration[0].properties;
}

function splitMainBindings(packageData, outputDir) {
    ensureDirectory(outputDir);

    const properties = getConfigProperties(packageData);
    const bindings = properties["vspacecode.bindings"].default;

    writeJson(path.join(outputDir, "magit-ref-bindings.jsonc"), properties["vspacecode.magitRefBindings"].default);
    writeJson(path.join(outputDir, "magit-refresh-bindings.jsonc"), properties["vspacecode.magitRefreshBindings"].default);
    writeJson(path.join(outputDir, "space-menu.jsonc"), bindings);

    const directCommands = [];
    const groupedBindings = [];

    for (const binding of bindings) {
        if (binding && Array.isArray(binding.bindings)) {
            groupedBindings.push(binding);
        } else {
            directCommands.push(binding);
        }
    }

    if (directCommands.length > 0) {
        writeJson(path.join(outputDir, "direct-commands.jsonc"), directCommands);
    }

    for (const binding of groupedBindings) {
        const fileName = `${toSlug(binding.name || binding.key)}.jsonc`;
        writeJson(path.join(outputDir, fileName), binding);
    }
}

function mergeMainBindings(fragmentDir) {
    const directCommandsPath = path.join(fragmentDir, "direct-commands.jsonc");
    const spaceMenuPath = path.join(fragmentDir, "space-menu.jsonc");

    if (fs.existsSync(spaceMenuPath)) {
        return readJsonc(spaceMenuPath);
    }

    const merged = [];

    if (fs.existsSync(directCommandsPath)) {
        merged.push(...readJsonc(directCommandsPath));
    }

    const jsoncFiles = fs
        .readdirSync(fragmentDir)
        .filter((file) => file.endsWith(".jsonc"))
        .filter((file) => !["direct-commands.jsonc", "space-menu.jsonc", "magit-ref-bindings.jsonc", "magit-refresh-bindings.jsonc"].includes(file))
        .sort();

    for (const file of jsoncFiles) {
        const entry = readJsonc(path.join(fragmentDir, file));
        if (entry && !Array.isArray(entry)) {
            merged.push(entry);
        }
    }

    return merged;
}

function buildPackageJson(packageJsonInputPath, bindingFragmentDir) {
    const packageData = readJsonc(packageJsonInputPath);
    const properties = getConfigProperties(packageData);

    if (fs.existsSync(path.join(bindingFragmentDir, "magit-ref-bindings.jsonc"))) {
        properties["vspacecode.magitRefBindings"].default = readJsonc(path.join(bindingFragmentDir, "magit-ref-bindings.jsonc"));
    }

    if (fs.existsSync(path.join(bindingFragmentDir, "magit-refresh-bindings.jsonc"))) {
        properties["vspacecode.magitRefreshBindings"].default = readJsonc(path.join(bindingFragmentDir, "magit-refresh-bindings.jsonc"));
    }

    if (fs.existsSync(bindingFragmentDir)) {
        properties["vspacecode.bindings"].default = mergeMainBindings(bindingFragmentDir);
    }

    return packageData;
}

function printUsage() {
    console.log("Usage: node build-package-json.js [--split]");
}

function main() {
    const args = process.argv.slice(2);

    if (args.includes("--help") || args.includes("-h")) {
        printUsage();
        return;
    }

    if (args.includes("--split")) {
        const packageData = readJsonc(packageJsonPath);
        splitMainBindings(packageData, bindingDir);
        console.log(`Split package bindings into ${bindingDir}`);
        return;
    }

    const packageData = buildPackageJson(packageJsonPath, bindingDir);
    writeJson(packageJsonPath, packageData);
    console.log(`Rebuilt ${packageJsonPath} from fragments in ${bindingDir}`);
}

if (require.main === module) {
    main();
}

module.exports = {
    buildPackageJson,
    splitMainBindings,
    mergeMainBindings,
};

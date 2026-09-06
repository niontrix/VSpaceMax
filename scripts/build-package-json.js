#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { parse } = require("jsonc-parser");

const projectRoot = path.resolve(__dirname, "..");
const packageJsonPath = path.join(projectRoot, "package.json");
const bindingDir = path.join(projectRoot, "src", "configuration", "bindings");
const buildDir = path.join(projectRoot, "build");
const buildPackageJsonPath = path.join(buildDir, "package.json");

const bindingFilesInPackageOrder = [
    "smart-select-expand-region.jsonc",
    "tasks.jsonc",
    "buffers.jsonc",
    "compile-comments.jsonc",
    "debug.jsonc",
    "errors.jsonc",
    "file.jsonc",
    "git.jsonc",
    "help.jsonc",
    "insert.jsonc",
    "jump-join-split.jsonc",
    "layouts.jsonc",
    "major.jsonc",
    "project.jsonc",
    "quit.jsonc",
    "resume-repeat.jsonc",
    "search-symbol.jsonc",
    "toggles.jsonc",
    "window.jsonc",
    "text.jsonc",
    "zoom-fold.jsonc",
    "diff-compare.jsonc",
    "frame.jsonc",
    "show.jsonc",
    "ui-toggles.jsonc",
];

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

function findBindingFile(fragmentDir, file) {
    const candidates = [
        path.join(fragmentDir, file),
        path.join(fragmentDir, "..", "layers", "core", "bindings", file),
    ];

    return candidates.find((filePath) => fs.existsSync(filePath));
}

function mergeMainBindings(fragmentDir) {
    const directCommandsPath = findBindingFile(fragmentDir, "direct-commands.jsonc");
    const merged = readJsonc(directCommandsPath);

    for (const file of bindingFilesInPackageOrder) {
        const filePath = findBindingFile(fragmentDir, file);
        if (filePath) {
            merged.push(readJsonc(filePath));
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

function buildPackageFile(packageJsonInputPath = packageJsonPath, outputPath = buildPackageJsonPath) {
    const packageData = buildPackageJson(packageJsonInputPath, bindingDir);
    ensureDirectory(path.dirname(outputPath));
    writeJson(outputPath, packageData);
    return outputPath;
}

function main() {
    const outputPath = buildPackageFile();
    console.log(`Built ${outputPath} from fragments in ${bindingDir}`);
}

if (require.main === module) {
    main();
}

module.exports = {
    buildPackageJson,
    buildPackageFile,
    mergeMainBindings,
};

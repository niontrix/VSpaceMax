#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { parse } = require("jsonc-parser");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, "package.json");
const CONFIGURATION_DIR = path.join(PROJECT_ROOT, "src", "configuration");
const BUILD_DIR = path.join(PROJECT_ROOT, "build");
const BUILD_PACKAGE_JSON_PATH = path.join(BUILD_DIR, "package.json");

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

// Hardcoded shell for the major menu (key: "m", name: "+Major", icon: "code", type: "conditional")
const MAJOR_MENU_SHELL = { key: "m", name: "+Major", icon: "code", type: "conditional", bindings: [] };

/**
 * Check if a binding file is a language-major fragment (layers/languages/<lang>/bindings.js).
 * @param {string} filePath Absolute path to the binding file
 * @returns {boolean} True if this is a language-major fragment
 */
function isLanguageMajorFragment(filePath) {
    // Matches any path of the form .../layers/languages/<language>/bindings.js
    const posixPath = filePath.split(path.sep).join("/");
    return /(^|\/)layers\/languages\/[^/]+\/bindings\.js$/.test(posixPath);
}

/**
 * Recursively collect binding fragments below the configuration directory.
 * JSONC fragments are stored in folders named "bindings"; language-major
 * fragments are stored as "bindings.js" directly in language folders.
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
                if (entry.name === "bindings.js") {
                    bindingFiles.push(entryPath);
                }
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

function buildPackageJson(packageJsonInputPath, configurationRootDir = CONFIGURATION_DIR) {
    const packageData = readJsonc(packageJsonInputPath);
    const properties = getConfigProperties(packageData);

    const bindingFiles = collectBindingFiles(configurationRootDir);

    // Partition binding files: magit files, language-major fragments, and main binding files
    const magitFiles = [];
    const languageMajorFiles = [];
    const mainBindingFiles = [];

    for (const filePath of bindingFiles) {
        const basename = path.basename(filePath);
        if (basename === "magit-ref-bindings.jsonc") {
            magitFiles.push(filePath);
        } else if (basename === "magit-refresh-bindings.jsonc") {
            magitFiles.push(filePath);
        } else if (isLanguageMajorFragment(filePath)) {
            languageMajorFiles.push(filePath);
        } else {
            mainBindingFiles.push(filePath);
        }
    }

    // Process magit files
    for (const filePath of magitFiles) {
        switch (path.basename(filePath)) {
            case "magit-ref-bindings.jsonc":
                properties["vspacecode.magitRefBindings"].default = readJsonc(filePath);
                break;
            case "magit-refresh-bindings.jsonc":
                properties["vspacecode.magitRefreshBindings"].default = readJsonc(filePath);
                break;
        }
    }

    // Merge language-major fragments into the "m" menu shell.
    // The bindings.js files are CommonJS modules whose export is the language binding node.
    const majorMenuBindings = languageMajorFiles.map((filePath) => require(filePath));
    // Create a fresh copy of the shell to avoid mutation across runs
    const majorMenuNode = { ...MAJOR_MENU_SHELL, bindings: majorMenuBindings };

    // Merge main binding files (excluding magit and language-major), then append the "m" node
    const allBindings = mergeMainBindings(mainBindingFiles);
    allBindings.push(majorMenuNode);
    properties["vspacecode.bindings"].default = allBindings;

    return packageData;
}

function buildPackageFile(packageJsonInputPath = PACKAGE_JSON_PATH, outputPath = BUILD_PACKAGE_JSON_PATH) {
    const packageData = buildPackageJson(packageJsonInputPath, CONFIGURATION_DIR);
    ensureDirectory(path.dirname(outputPath));
    writeJson(outputPath, packageData);
    return outputPath;
}

function main() {
    const outputPath = buildPackageFile();
    console.log(`Built ${outputPath} from binding fragments in ${CONFIGURATION_DIR}`);
}

if (require.main === module) {
    main();
}

module.exports = {
    buildPackageJson,
    buildPackageFile,
    collectBindingFiles,
    mergeMainBindings,
};

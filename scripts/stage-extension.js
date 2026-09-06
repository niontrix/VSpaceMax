#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { buildPackageFile } = require("./build-package-json");
const { parse } = require("jsonc-parser");

const projectRoot = path.resolve(__dirname, "..");
const buildDir = path.join(projectRoot, "build");

function copyProjectFile(fileName) {
    const sourcePath = path.join(projectRoot, fileName);
    const targetPath = path.join(buildDir, fileName);
    if (fs.existsSync(sourcePath)) {
        fs.cpSync(sourcePath, targetPath, { recursive: true });
    }
}

fs.rmSync(buildDir, { recursive: true, force: true });
fs.mkdirSync(buildDir, { recursive: true });
const stagedPackagePath = buildPackageFile();
const stagedPackage = parse(fs.readFileSync(stagedPackagePath, "utf8"));
delete stagedPackage.scripts;
fs.writeFileSync(stagedPackagePath, `${JSON.stringify(stagedPackage, null, 4)}\n`);

for (const fileName of [
    "CHANGELOG.md",
    "LICENSE.txt",
    "README.md",
    ".vscodeignore",
    "dist",
    "resources",
    "walkthroughs",
]) {
    copyProjectFile(fileName);
}

console.log(`Staged extension project in ${buildDir}`);

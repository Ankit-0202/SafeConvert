import { existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, relative, dirname, extname } from "path";
import { execSync } from "child_process";

const sourceDir = join(__dirname, "../unoptimized-js");
const outputDir = join(__dirname, "../dist/js");

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

function processFile(filePath) {
  const relativePath = relative(sourceDir, filePath);
  const outputPath = join(outputDir, relativePath);
  const outputDirForFile = dirname(outputPath);

  // Create subdirectories in the output folder
  if (!existsSync(outputDirForFile)) {
    mkdirSync(outputDirForFile, { recursive: true });
  }

  try {
    // 1. Obfuscate the file
    console.log(`Obfuscating: ${filePath}`);
    const obfuscateCmd = `npx javascript-obfuscator "${filePath}" --output "${outputPath}"`;
    execSync(obfuscateCmd);

    // 2. Minify the obfuscated file using Terser
    console.log(`Minifying: ${outputPath}`);
    const minifyCmd = `npx terser "${outputPath}" -o "${outputPath}" --compress --mangle`;
    execSync(minifyCmd);

    console.log(`Success: ${outputPath}`);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  readdirSync(dirPath).forEach((file) => {
    const filePath = join(dirPath, file);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      processDirectory(filePath);
    } else if (extname(filePath) === ".js") {
      if (filePath !== join(__dirname, "build.js")) {
        processFile(filePath);
      }
    }
  });
}

console.log("Starting JavaScript build process...");
processDirectory(sourceDir);
console.log("Build complete. Files are in the /dist/js folder.");

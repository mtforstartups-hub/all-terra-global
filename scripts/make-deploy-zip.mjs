import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT_DIR = process.cwd();
const OUTPUT_ZIP = path.join(ROOT_DIR, "plesk-deploy.zip");
const STAGING_DIR = path.join(ROOT_DIR, ".deploy-staging");

// Specific folders to include
const INCLUDE_DIRS = [
  "app",
  "components",
  "context",
  "lib",
  "public",
  "stores",
];

// Specific files to include
const INCLUDE_FILES = [
  "package.json",
  "server.js",
  "env.ts",
  "next.config.ts",
  "postcss.config.mjs",
  "tsconfig.json",
  "next-env.d.ts",
  "eslint.config.mjs",
  ".node-version",
];

// Safety check: files that must NEVER be in the zip
const NEVER_INCLUDE = [
  "node_modules",
  ".next",
  ".git",
  ".env",
  ".env.production",
  ".env.test",
  "private.key",
  "auth.db",
  "app.log",
];

console.log("🚀 Preparing Plesk deployment package...\n");

// 1. Clean previous artifacts
if (fs.existsSync(OUTPUT_ZIP)) {
  fs.rmSync(OUTPUT_ZIP, { force: true });
}
if (fs.existsSync(STAGING_DIR)) {
  fs.rmSync(STAGING_DIR, { recursive: true, force: true });
}

fs.mkdirSync(STAGING_DIR, { recursive: true });

// Helper to copy directory recursively with exclusions
function copyDirectory(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (
      entry.name === "node_modules" ||
      entry.name === ".next" ||
      entry.name.endsWith(".zip") ||
      entry.name.endsWith(".log")
    ) {
      continue;
    }

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 2. Stage directories
for (const dir of INCLUDE_DIRS) {
  const dirPath = path.join(ROOT_DIR, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`📁 Adding folder: ${dir}/`);
    copyDirectory(dirPath, path.join(STAGING_DIR, dir));
  } else {
    console.warn(`⚠️ Warning: Directory ${dir} not found, skipping.`);
  }
}

// 3. Stage individual files
for (const file of INCLUDE_FILES) {
  const filePath = path.join(ROOT_DIR, file);
  if (fs.existsSync(filePath)) {
    console.log(`📄 Adding file:   ${file}`);
    fs.copyFileSync(filePath, path.join(STAGING_DIR, file));
  } else {
    console.warn(`⚠️ Warning: File ${file} not found, skipping.`);
  }
}

// 4. Sanity check: Ensure no forbidden files got copied
for (const forbidden of NEVER_INCLUDE) {
  const checkPath = path.join(STAGING_DIR, forbidden);
  if (fs.existsSync(checkPath)) {
    throw new Error(`Security Violation: ${forbidden} was copied into staging! Aborting.`);
  }
}

// 5. Create zip using native OS tools (bsdtar/tar or powershell Compress-Archive)
console.log("\n📦 Compressing into plesk-deploy.zip...");

try {
  // tar -a detects .zip by extension and creates a standard ZIP archive cross-platform
  execSync(`tar -a -cf "${OUTPUT_ZIP}" -C "${STAGING_DIR}" .`, { stdio: "pipe" });
} catch {
  console.log("ℹ️ tar command failed, trying PowerShell Compress-Archive...");
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${STAGING_DIR}/*' -DestinationPath '${OUTPUT_ZIP}' -Force"`,
    { stdio: "inherit" }
  );
}

// 6. Clean up staging directory
fs.rmSync(STAGING_DIR, { recursive: true, force: true });

// 7. Summary
if (fs.existsSync(OUTPUT_ZIP)) {
  const stats = fs.statSync(OUTPUT_ZIP);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n✅ Success! Created: plesk-deploy.zip (${sizeMB} MB)`);
  console.log("ℹ️  Ready to upload via Plesk File Manager directly into /httpdocs.");
} else {
  console.error("\n❌ Failed to generate plesk-deploy.zip.");
  process.exit(1);
}

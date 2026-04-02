import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const rootDir = process.cwd();
const distDir = join(rootDir, "dist");

const buildPaths = {
  html: ["index.html", "booking.html", "admin.html", "login.html", "_headers"],
  directories: ["css", "js", "images"]
};

const ensureDir = (directoryPath) => {
  mkdirSync(directoryPath, { recursive: true });
};

rmSync(distDir, { recursive: true, force: true });
ensureDir(distDir);

buildPaths.html.forEach((filename) => {
  cpSync(join(rootDir, filename), join(distDir, filename));
});

buildPaths.directories.forEach((directory) => {
  const sourcePath = join(rootDir, directory);
  const targetPath = join(distDir, directory);

  if (existsSync(sourcePath)) {
    cpSync(sourcePath, targetPath, { recursive: true });
  }
});

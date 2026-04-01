import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const rootDir = process.cwd();
const distDir = join(rootDir, "dist");
const runtimeConfigPath = join(distDir, "js", "runtime-config.js");

const buildPaths = {
  html: ["index.html", "booking.html", "admin.html", "login.html"],
  directories: ["css", "js", "images"]
};

const runtimeConfig = {
  SUPABASE_URL: String(process.env.DIAMOND_SUPABASE_URL ?? "").trim(),
  SUPABASE_ANON_KEY: String(process.env.DIAMOND_SUPABASE_ANON_KEY ?? "").trim()
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

ensureDir(join(distDir, "js"));
writeFileSync(
  runtimeConfigPath,
  `window.DIAMOND_RUNTIME_CONFIG = ${JSON.stringify(runtimeConfig, null, 2)};\n`,
  "utf8"
);

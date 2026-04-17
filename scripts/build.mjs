import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";

const rootDir = process.cwd();
const distDir = join(rootDir, "dist");
const runtimeConfigPath = join(distDir, "js", "runtime-config.js");
const aiAppDir = join(rootDir, "ai", "diamond-banquet-hall-enhanced-booking");
const aiWidgetDir = join(aiAppDir, "dist-widget");
const DEFAULT_SITE_URL = "https://diamond-banquet-hall.vercel.app";
const SITE_URL_TOKEN = "__SITE_URL__";
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const buildPaths = {
  html: ["index.html", "booking.html", "gallery.html", "admin.html", "login.html", "_headers"],
  directories: ["css", "js", "images", "images-events"]
};

const ENV_VAR_NAMES = {
  url: "DIAMOND_SUPABASE_URL",
  key: "DIAMOND_SUPABASE_ANON_KEY",
  configFile: "DIAMOND_RUNTIME_CONFIG_FILE",
  siteUrl: "DIAMOND_SITE_URL"
};

const CLI_FLAG_NAMES = {
  url: new Set(["--supabase-url", "--diamond-supabase-url", "--diamond-supabase-url-env"]),
  key: new Set(["--supabase-anon-key", "--diamond-supabase-anon-key", "--diamond-supabase-anon-key-env"]),
  configFile: new Set(["--runtime-config-file", "--diamond-runtime-config-file"]),
  siteUrl: new Set(["--site-url", "--diamond-site-url"])
};

const toTrimmedString = (value) => String(value ?? "").trim();

const firstNonEmpty = (...values) => values.find((value) => toTrimmedString(value)) ?? "";

const readCliArgs = (argv) => {
  const args = {
    url: "",
    key: "",
    configFile: "",
    siteUrl: ""
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const nextToken = argv[index + 1];

    const readFlagValue = () => {
      if (token.includes("=")) {
        return token.slice(token.indexOf("=") + 1);
      }

      if (typeof nextToken === "string" && !nextToken.startsWith("--")) {
        index += 1;
        return nextToken;
      }

      return "";
    };

    const normalizedToken = token.includes("=") ? token.slice(0, token.indexOf("=")) : token;

    if (CLI_FLAG_NAMES.url.has(normalizedToken)) {
      args.url = readFlagValue();
      continue;
    }

    if (CLI_FLAG_NAMES.key.has(normalizedToken)) {
      args.key = readFlagValue();
      continue;
    }

    if (CLI_FLAG_NAMES.configFile.has(normalizedToken)) {
      args.configFile = readFlagValue();
      continue;
    }

    if (CLI_FLAG_NAMES.siteUrl.has(normalizedToken)) {
      args.siteUrl = readFlagValue();
    }
  }

  return args;
};

const parseEnvFile = (content) => {
  const values = {};

  content.split(/\r?\n/u).forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    let value = trimmedLine.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  });

  return values;
};

const readRuntimeConfigFile = (filePath) => {
  if (!filePath) {
    return {};
  }

  const resolvedPath = isAbsolute(filePath) ? filePath : resolve(rootDir, filePath);

  if (!existsSync(resolvedPath)) {
    throw new Error(`Runtime config file not found: ${resolvedPath}`);
  }

  const rawContent = readFileSync(resolvedPath, "utf8");

  if (!rawContent.trim()) {
    throw new Error(`Runtime config file is empty: ${resolvedPath}`);
  }

  if (resolvedPath.endsWith(".json")) {
    const parsed = JSON.parse(rawContent);

    return typeof parsed === "object" && parsed ? parsed : {};
  }

  return parseEnvFile(rawContent);
};

const cliArgs = readCliArgs(process.argv.slice(2));
const fileConfig = readRuntimeConfigFile(
  firstNonEmpty(cliArgs.configFile, process.env[ENV_VAR_NAMES.configFile])
);

const normalizeSiteUrl = (value) => {
  try {
    const url = new URL(firstNonEmpty(value, DEFAULT_SITE_URL));
    const normalizedPath = url.pathname === "/" ? "" : url.pathname.replace(/\/+$/u, "");
    return `${url.origin}${normalizedPath}`;
  } catch (error) {
    return DEFAULT_SITE_URL;
  }
};

console.log("ENV CHECK:", {
  url: process.env[ENV_VAR_NAMES.url],
  key: process.env[ENV_VAR_NAMES.key]
});

console.log("BUILD CONTEXT:", {
  cfPages: process.env.CF_PAGES,
  branch: process.env.CF_PAGES_BRANCH,
  commit: process.env.CF_PAGES_COMMIT_SHA,
  runtimeConfigFile: firstNonEmpty(cliArgs.configFile, process.env[ENV_VAR_NAMES.configFile]) || null
});

const siteUrl = normalizeSiteUrl(
  firstNonEmpty(
    process.env[ENV_VAR_NAMES.siteUrl],
    process.env.npm_config_diamond_site_url,
    cliArgs.siteUrl,
    fileConfig.SITE_URL,
    fileConfig.DIAMOND_SITE_URL,
    DEFAULT_SITE_URL
  )
);

const runtimeConfig = {
  SUPABASE_URL: toTrimmedString(
    firstNonEmpty(
      process.env[ENV_VAR_NAMES.url],
      process.env.npm_config_diamond_supabase_url,
      cliArgs.url,
      fileConfig.SUPABASE_URL,
      fileConfig.DIAMOND_SUPABASE_URL
    )
  ),
  SUPABASE_ANON_KEY: toTrimmedString(
    firstNonEmpty(
      process.env[ENV_VAR_NAMES.key],
      process.env.npm_config_diamond_supabase_anon_key,
      cliArgs.key,
      fileConfig.SUPABASE_ANON_KEY,
      fileConfig.DIAMOND_SUPABASE_ANON_KEY
    )
  )
};

if (!runtimeConfig.SUPABASE_URL || !runtimeConfig.SUPABASE_ANON_KEY) {
  throw new Error(
    [
      "Missing Supabase runtime config for the Pages build.",
      `Expected ${ENV_VAR_NAMES.url} and ${ENV_VAR_NAMES.key} in the build environment.`,
      "Fallback sources also supported:",
      "1. CLI flags: --supabase-url and --supabase-anon-key",
      `2. A config file via ${ENV_VAR_NAMES.configFile} or --runtime-config-file`,
      "   Supported file formats: JSON or KEY=VALUE env files."
    ].join("\n")
  );
}

const ensureDir = (directoryPath) => {
  mkdirSync(directoryPath, { recursive: true });
};

const runCommand = (command, args, options = {}) => {
  execFileSync(command, args, {
    cwd: rootDir,
    env: process.env,
    stdio: "inherit",
    ...options
  });
};

const buildAiWidget = () => {
  if (!existsSync(aiAppDir)) {
    throw new Error(`AI widget app not found: ${aiAppDir}`);
  }

  if (!existsSync(join(aiAppDir, "node_modules"))) {
    runCommand(npmCommand, ["ci"], { cwd: aiAppDir });
  }

  runCommand(npmCommand, ["run", "build:widget"], { cwd: aiAppDir });

  if (!existsSync(aiWidgetDir)) {
    throw new Error(`AI widget build output not found: ${aiWidgetDir}`);
  }

  cpSync(aiWidgetDir, join(distDir, "ai-widget"), { recursive: true });
};

const replaceSiteUrlToken = (filePath) => {
  if (!existsSync(filePath)) {
    return;
  }

  const fileContent = readFileSync(filePath, "utf8");

  if (!fileContent.includes(SITE_URL_TOKEN)) {
    return;
  }

  writeFileSync(filePath, fileContent.replaceAll(SITE_URL_TOKEN, siteUrl), "utf8");
};

const writeRobotsFile = () => {
  writeFileSync(
    join(distDir, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    "utf8"
  );
};

const writeSitemapFile = () => {
  const pages = [
    { source: "index.html", path: "/" },
    { source: "gallery.html", path: "/gallery.html" },
    { source: "booking.html", path: "/booking.html" }
  ];
  const urlEntries = pages
    .map(({ source, path: urlPath }) => {
      const lastmod = statSync(join(rootDir, source)).mtime.toISOString();

      return [
        "  <url>",
        `    <loc>${siteUrl}${urlPath}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        "  </url>"
      ].join("\n");
    })
    .join("\n");

  writeFileSync(
    join(distDir, "sitemap.xml"),
    [
      "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
      "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
      urlEntries,
      "</urlset>",
      ""
    ].join("\n"),
    "utf8"
  );
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

["index.html", "booking.html", "gallery.html", "admin.html", "login.html", "js/main.js"].forEach((filePath) => {
  replaceSiteUrlToken(join(distDir, filePath));
});

writeRobotsFile();
writeSitemapFile();

ensureDir(join(distDir, "js"));
writeFileSync(
  runtimeConfigPath,
  `window.DIAMOND_RUNTIME_CONFIG = ${JSON.stringify(runtimeConfig, null, 2)};\n`,
  "utf8"
);

buildAiWidget();

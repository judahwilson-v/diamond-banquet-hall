# Task Proposals (Codebase Review)

## 1) Typo fix task
**Task:** Verify and correct the staff admin allowlist email if `empl@diamond.com` is an accidental truncation (for example, intended `employee@diamond.com`).

**Why:** The super admin entry is a full mailbox while the staff entry appears abbreviated, which increases the risk of lockout due to a typo in a security-critical credential.

**Acceptance criteria:**
- Confirm intended staff mailbox with project owner.
- Update the allowlist constant to the correct mailbox.
- Add a short inline note describing how allowlisted identities are managed.

**Evidence:** `js/login.js` allowlist entries. 

## 2) Bug fix task
**Task:** Stop logging sensitive runtime configuration values during builds.

**Why:** The build script prints both Supabase URL and anon key in plain text to logs. Even if this is an anon key, writing credentials to logs is a security anti-pattern and increases accidental exposure risk.

**Acceptance criteria:**
- Replace current logging with redacted output (e.g., show only last 4 chars).
- Keep enough diagnostics to troubleshoot missing config.
- Ensure the key value is never emitted in full.

**Evidence:** `scripts/build.mjs` `console.log("ENV CHECK:", ...)` currently logs raw env values.

## 3) Comment/documentation discrepancy task
**Task:** Expand `README.md` to document the runtime config requirements used by the build pipeline.

**Why:** `README.md` currently contains only the repo title, while the build system requires specific env vars/flags and throws if they are absent. The documentation does not reflect operational requirements.

**Acceptance criteria:**
- Add local setup section with required env vars (`DIAMOND_SUPABASE_URL`, `DIAMOND_SUPABASE_ANON_KEY`).
- Document optional config-file path support (`DIAMOND_RUNTIME_CONFIG_FILE` / `--runtime-config-file`).
- Include build/dev/deploy command examples.

**Evidence:** Minimal README vs strict build-time config checks in `scripts/build.mjs`.

## 4) Test improvement task
**Task:** Add automated tests for build config parsing and safety behavior.

**Why:** The build script contains non-trivial parsing logic (CLI flags, env files, JSON config) and security-sensitive logging behavior but there are no tests in the project scripts.

**Acceptance criteria:**
- Add a test runner script (e.g., Node test runner).
- Add coverage for: CLI parsing precedence, env-file parsing, missing-config error path, and log redaction behavior.
- Add CI/local command documentation for running tests.

**Evidence:** Parsing and config branching in `scripts/build.mjs`; `package.json` currently lacks a `test` script.

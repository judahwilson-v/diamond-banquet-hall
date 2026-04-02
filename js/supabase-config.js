import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const createConfigError = (message) => {
  const error = new Error(message);
  error.code = "SUPABASE_CONFIG_MISSING";
  return error;
};

const buildThrowingClientProxy = (error) => {
  const callable = () => {
    throw error;
  };

  return new Proxy(callable, {
    get(_target, property) {
      if (property === "then") {
        return undefined;
      }

      return buildThrowingClientProxy(error);
    },
    apply() {
      throw error;
    }
  });
};

const waitForRuntimeConfig = (timeout = 3000) =>
  new Promise((resolve, reject) => {
    const start = Date.now();

    const check = () => {
      const config = globalThis.DIAMOND_RUNTIME_CONFIG;

      if (config && config.SUPABASE_URL && config.SUPABASE_ANON_KEY) {
        console.log("Runtime config ready:", config);
        resolve(config);
        return;
      }

      if (Date.now() - start >= timeout) {
        reject(createConfigError("Runtime config never loaded"));
        return;
      }

      console.warn("Waiting for runtime config...");
      globalThis.setTimeout(check, 50);
    };

    check();
  });

let SUPABASE_URL = "";
let SUPABASE_ANON_KEY = "";
let SUPABASE_CONFIG_ERROR = null;
let hasSupabaseConfig = false;
let supabaseClient = null;
let supabase = null;

try {
  const config = await waitForRuntimeConfig();

  SUPABASE_URL = String(config.SUPABASE_URL ?? "").trim();
  SUPABASE_ANON_KEY = String(config.SUPABASE_ANON_KEY ?? "").trim();

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw createConfigError("Runtime config never loaded");
  }

  try {
    const parsedUrl = new URL(SUPABASE_URL);

    if (!/^https?:$/.test(parsedUrl.protocol)) {
      throw new Error("Supabase runtime config must use an http or https URL.");
    }
  } catch (_error) {
    throw createConfigError(
      "Supabase runtime config is invalid. Check DIAMOND_SUPABASE_URL and DIAMOND_SUPABASE_ANON_KEY."
    );
  }

  supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
  supabase = supabaseClient;
  hasSupabaseConfig = true;
  globalThis.supabaseClient = supabaseClient;
} catch (error) {
  SUPABASE_CONFIG_ERROR = error?.code === "SUPABASE_CONFIG_MISSING"
    ? error
    : createConfigError(error?.message || "Runtime config never loaded");
  hasSupabaseConfig = false;
  console.error(SUPABASE_CONFIG_ERROR);
  supabase = buildThrowingClientProxy(SUPABASE_CONFIG_ERROR);
  supabaseClient = supabase;
}

const initSupabase = async () => supabaseClient;

export {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_CONFIG_ERROR,
  hasSupabaseConfig,
  initSupabase,
  initSupabase as initializeSupabase,
  supabase,
  supabaseClient
};

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const createConfigError = (message) => {
  const error = new Error(message);
  error.code = "SUPABASE_CONFIG_MISSING";
  return error;
};

const waitForRuntimeConfig = (timeout = 3000) =>
  new Promise((resolve, reject) => {
    const start = Date.now();

    const check = () => {
      const config = globalThis.DIAMOND_RUNTIME_CONFIG;

      if (config?.SUPABASE_URL && config?.SUPABASE_ANON_KEY) {
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
let supabase = null;
let supabaseClient = null;
let initPromise = null;

const initializeSupabase = async () => {
  if (supabaseClient) {
    return supabaseClient;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = waitForRuntimeConfig()
    .then((config) => {
      SUPABASE_URL = String(config.SUPABASE_URL ?? "").trim();
      SUPABASE_ANON_KEY = String(config.SUPABASE_ANON_KEY ?? "").trim();

      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw createConfigError("Runtime config never loaded");
      }

      const parsedUrl = new URL(SUPABASE_URL);

      if (!/^https?:$/.test(parsedUrl.protocol)) {
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
      SUPABASE_CONFIG_ERROR = null;
      globalThis.supabaseClient = supabaseClient;
      globalThis.supabase = supabaseClient;

      return supabaseClient;
    })
    .catch((error) => {
      SUPABASE_CONFIG_ERROR =
        error?.code === "SUPABASE_CONFIG_MISSING"
          ? error
          : createConfigError(error?.message || "Runtime config never loaded");
      hasSupabaseConfig = false;
      supabase = null;
      supabaseClient = null;
      globalThis.supabaseClient = null;
      globalThis.supabase = null;
      console.error("Supabase config not found", SUPABASE_CONFIG_ERROR);
      return null;
    });

  return initPromise;
};

await initializeSupabase();

export {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_CONFIG_ERROR,
  hasSupabaseConfig,
  initializeSupabase,
  supabase,
  supabaseClient
};

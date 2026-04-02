import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const createConfigError = (message) => {
  const error = new Error(message);
  error.code = "SUPABASE_CONFIG_MISSING";
  return error;
};

console.log("Runtime config loaded:", globalThis.DIAMOND_RUNTIME_CONFIG);

let SUPABASE_URL = "";
let SUPABASE_ANON_KEY = "";
let SUPABASE_CONFIG_ERROR = null;
let hasSupabaseConfig = false;
let initializedClient = null;
let initializationAttempted = false;

const resolveRuntimeConfig = () => {
  if (
    !globalThis.DIAMOND_RUNTIME_CONFIG ||
    !globalThis.DIAMOND_RUNTIME_CONFIG.SUPABASE_URL
  ) {
    console.error("Runtime config missing:", globalThis.DIAMOND_RUNTIME_CONFIG);
    throw createConfigError("Supabase runtime config is missing");
  }

  const runtimeConfig = globalThis.DIAMOND_RUNTIME_CONFIG;
  const supabaseUrl = String(runtimeConfig.SUPABASE_URL ?? "").trim();
  const supabaseAnonKey = String(runtimeConfig.SUPABASE_ANON_KEY ?? "").trim();

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Runtime config missing:", globalThis.DIAMOND_RUNTIME_CONFIG);
    throw createConfigError("Supabase runtime config is missing");
  }

  try {
    const parsedUrl = new URL(supabaseUrl);

    if (!/^https?:$/.test(parsedUrl.protocol)) {
      throw new Error("Supabase runtime config must use an http or https URL.");
    }
  } catch (_error) {
    throw createConfigError(
      "Supabase runtime config is invalid. Check DIAMOND_SUPABASE_URL and DIAMOND_SUPABASE_ANON_KEY."
    );
  }

  return {
    supabaseUrl,
    supabaseAnonKey
  };
};

const initializeSupabase = () => {
  if (initializedClient) {
    return initializedClient;
  }

  if (initializationAttempted && SUPABASE_CONFIG_ERROR) {
    throw SUPABASE_CONFIG_ERROR;
  }

  initializationAttempted = true;

  try {
    const { supabaseUrl, supabaseAnonKey } = resolveRuntimeConfig();

    SUPABASE_URL = supabaseUrl;
    SUPABASE_ANON_KEY = supabaseAnonKey;
    initializedClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
    SUPABASE_CONFIG_ERROR = null;
    hasSupabaseConfig = true;
  } catch (error) {
    SUPABASE_CONFIG_ERROR = error?.code === "SUPABASE_CONFIG_MISSING"
      ? error
      : createConfigError("Supabase runtime config is missing");
    hasSupabaseConfig = false;
    throw SUPABASE_CONFIG_ERROR;
  }

  return initializedClient;
};

const buildClientProxy = () =>
  new Proxy(
    {},
    {
      get(_target, property) {
        if (property === "then") {
          return undefined;
        }

        const client = initializeSupabase();
        const value = client[property];

        return typeof value === "function" ? value.bind(client) : value;
      }
    }
  );

const supabase = buildClientProxy();
const supabaseClient = supabase;

if (globalThis.document) {
  if (globalThis.document.readyState === "loading") {
    globalThis.document.addEventListener(
      "DOMContentLoaded",
      () => {
        try {
          initializeSupabase();
        } catch (error) {
          console.error(error);
        }
      },
      { once: true }
    );
  } else {
    try {
      initializeSupabase();
    } catch (error) {
      console.error(error);
    }
  }
}

export {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_CONFIG_ERROR,
  hasSupabaseConfig,
  initializeSupabase,
  supabase,
  supabaseClient
};

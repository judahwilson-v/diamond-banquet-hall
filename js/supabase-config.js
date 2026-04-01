import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const runtimeConfig = globalThis.DIAMOND_RUNTIME_CONFIG ?? {};
const SUPABASE_URL = String(runtimeConfig.SUPABASE_URL ?? "").trim();
const SUPABASE_ANON_KEY = String(runtimeConfig.SUPABASE_ANON_KEY ?? "").trim();

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

let SUPABASE_CONFIG_ERROR = null;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  SUPABASE_CONFIG_ERROR = createConfigError(
    "Supabase runtime config is missing. Set DIAMOND_SUPABASE_URL and DIAMOND_SUPABASE_ANON_KEY."
  );
} else {
  try {
    const parsedUrl = new URL(SUPABASE_URL);

    if (!/^https?:$/.test(parsedUrl.protocol)) {
      throw new Error("Supabase runtime config must use an http or https URL.");
    }
  } catch (_error) {
    SUPABASE_CONFIG_ERROR = createConfigError(
      "Supabase runtime config is invalid. Check DIAMOND_SUPABASE_URL and DIAMOND_SUPABASE_ANON_KEY."
    );
  }
}

const supabase = SUPABASE_CONFIG_ERROR
  ? buildThrowingClientProxy(SUPABASE_CONFIG_ERROR)
  : createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });

const supabaseClient = supabase;
const hasSupabaseConfig = !SUPABASE_CONFIG_ERROR;

export { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_CONFIG_ERROR, hasSupabaseConfig, supabase, supabaseClient };

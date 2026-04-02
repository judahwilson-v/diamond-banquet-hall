const STATIC_GALLERY_FILES = [
  "hero.jpg",
  "hall1.jpg",
  "hall2.jpg",
  "hall3.jpg",
  "room.jpg",
  "parking.jpg"
];

const buildError = (message, status = 500, code = "REQUEST_FAILED") => {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
};

const normalizeResult = async (response) => {
  const rawText = await response.text();
  let payload = null;

  if (rawText) {
    try {
      payload = JSON.parse(rawText);
    } catch (_error) {
      payload = rawText;
    }
  }

  if (!response.ok) {
    const error =
      payload && typeof payload === "object" && !Array.isArray(payload)
        ? buildError(
            payload.error || response.statusText || "Request failed.",
            response.status,
            payload.code || "REQUEST_FAILED"
          )
        : buildError(String(payload || response.statusText || "Request failed."), response.status);

    return {
      data: null,
      error
    };
  }

  return {
    data: payload,
    error: null
  };
};

const apiRequest = async (path, { method = "GET", body } = {}) => {
  try {
    const headers = {};

    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(path, {
      method,
      credentials: "same-origin",
      headers,
      body: body === undefined ? undefined : JSON.stringify(body)
    });

    return normalizeResult(response);
  } catch (error) {
    return {
      data: null,
      error: buildError(error?.message || "Network request failed.")
    };
  }
};

class QueryBuilder {
  constructor(table) {
    this.table = table;
    this.operation = "select";
    this.filters = {
      eq: {},
      gte: {},
      lte: {},
      in: {}
    };
    this.payload = null;
    this.singleMode = null;
  }

  select(_columns = "*") {
    return this;
  }

  eq(column, value) {
    this.filters.eq[column] = value;
    return this;
  }

  gte(column, value) {
    this.filters.gte[column] = value;
    return this;
  }

  lte(column, value) {
    this.filters.lte[column] = value;
    return this;
  }

  in(column, values) {
    this.filters.in[column] = values;
    return this;
  }

  order(_column, _options = {}) {
    return this;
  }

  update(payload) {
    this.operation = "update";
    this.payload = payload;
    return this;
  }

  insert(payload) {
    this.operation = "insert";
    this.payload = payload;
    return this;
  }

  upsert(payload) {
    this.operation = "upsert";
    this.payload = payload;
    return this;
  }

  delete() {
    this.operation = "delete";
    return this;
  }

  maybeSingle() {
    this.singleMode = "maybe";
    return this.execute();
  }

  single() {
    this.singleMode = "single";
    return this.execute();
  }

  then(resolve, reject) {
    return this.execute().then(resolve, reject);
  }

  async execute() {
    let result;

    if (this.operation === "select") {
      result = await this.executeSelect();
    } else {
      result = await this.executeMutation();
    }

    if (result.error) {
      return result;
    }

    if (this.singleMode && Array.isArray(result.data)) {
      if (!result.data.length) {
        if (this.singleMode === "maybe") {
          return {
            data: null,
            error: null
          };
        }

        return {
          data: null,
          error: buildError("Expected a row but none were returned.", 404, "ROW_NOT_FOUND")
        };
      }

      return {
        data: result.data[0],
        error: null
      };
    }

    return result;
  }

  executeSelect() {
    switch (this.table) {
      case "site_settings":
        return apiRequest("/api/site-settings");
      case "reviews":
        return apiRequest("/api/reviews");
      case "enquiries":
        return apiRequest("/api/admin/enquiries");
      case "bookings":
        return apiRequest("/api/admin/bookings");
      case "admin_users": {
        const email = String(this.filters.eq.email ?? "").trim();
        const query = email ? `?email=${encodeURIComponent(email)}` : "";
        return apiRequest(`/api/admin/users${query}`);
      }
      case "booking_requests":
        return Promise.resolve({
          data: [],
          error: null
        });
      default:
        return Promise.resolve({
          data: null,
          error: buildError(`Unsupported data table: ${this.table}`, 400, "UNSUPPORTED_TABLE")
        });
    }
  }

  executeMutation() {
    switch (this.table) {
      case "site_settings":
        return apiRequest("/api/admin/site-settings", {
          method: "PATCH",
          body: this.payload
        });
      case "enquiries":
        if (this.operation === "update") {
          return apiRequest("/api/admin/enquiries", {
            method: "PATCH",
            body: {
              id: this.filters.eq.id,
              ...this.payload
            }
          });
        }

        if (this.operation === "delete") {
          return apiRequest(`/api/admin/enquiries?id=${encodeURIComponent(String(this.filters.eq.id ?? ""))}`, {
            method: "DELETE"
          });
        }

        break;
      case "bookings":
        if (this.operation === "delete") {
          return apiRequest(`/api/admin/bookings?id=${encodeURIComponent(String(this.filters.eq.id ?? ""))}`, {
            method: "DELETE"
          });
        }

        break;
      case "reviews":
        if (this.operation === "insert") {
          return apiRequest("/api/admin/reviews", {
            method: "POST",
            body: this.payload
          });
        }

        if (this.operation === "delete") {
          return apiRequest(`/api/admin/reviews?id=${encodeURIComponent(String(this.filters.eq.id ?? ""))}`, {
            method: "DELETE"
          });
        }

        break;
      default:
        break;
    }

    return Promise.resolve({
      data: null,
      error: buildError(
        `Unsupported ${this.operation} operation for table: ${this.table}`,
        400,
        "UNSUPPORTED_OPERATION"
      )
    });
  }
}

const createMockChannel = () => ({
  on() {
    return this;
  },
  subscribe(callback) {
    queueMicrotask(() => {
      callback?.("SUBSCRIBED");
    });
    return this;
  },
  unsubscribe() {
    return undefined;
  }
});

const createClient = () => ({
  from(table) {
    return new QueryBuilder(table);
  },
  async rpc(name, payload) {
    if (name === "get_public_booked_dates") {
      const params = new URLSearchParams();

      if (payload?.p_start_date) {
        params.set("startDate", payload.p_start_date);
      }

      if (payload?.p_end_date) {
        params.set("endDate", payload.p_end_date);
      }

      return apiRequest(`/api/booked-dates${params.size ? `?${params.toString()}` : ""}`);
    }

    if (name === "create_booking_request") {
      return apiRequest("/api/bookings", {
        method: "POST",
        body: payload
      });
    }

    if (name === "admin_save_booking") {
      return apiRequest("/api/admin/bookings", {
        method: "PATCH",
        body: payload
      });
    }

    return {
      data: null,
      error: buildError(`Unsupported remote procedure: ${name}`, 400, "UNSUPPORTED_RPC")
    };
  },
  storage: {
    from() {
      return {
        async list() {
          return {
            data: STATIC_GALLERY_FILES.map((name) => ({ name })),
            error: null
          };
        },
        async createSignedUrl(path) {
          return {
            data: {
              signedUrl: `/images/${String(path ?? "").trim()}`
            },
            error: null
          };
        }
      };
    }
  },
  auth: {
    async getSession() {
      const result = await apiRequest("/api/admin/session");

      return {
        data: {
          session: result.data?.session ?? null
        },
        error: result.error
      };
    },
    async signInWithPassword({ email, password }) {
      const result = await apiRequest("/api/admin/session", {
        method: "POST",
        body: {
          email,
          password
        }
      });

      return {
        data: {
          session: result.data?.session ?? null
        },
        error: result.error
      };
    },
    async signOut() {
      const result = await apiRequest("/api/admin/session", {
        method: "DELETE"
      });

      return {
        data: result.data ?? null,
        error: result.error
      };
    }
  },
  channel() {
    return createMockChannel();
  },
  async removeChannel(channel) {
    channel?.unsubscribe?.();
    return "ok";
  }
});

const supabaseClient = createClient();
const supabase = supabaseClient;
const initializeSupabase = async () => supabaseClient;
const SUPABASE_URL = "cloudflare-d1";
const SUPABASE_ANON_KEY = "pages-functions";
const SUPABASE_CONFIG_ERROR = null;
const hasSupabaseConfig = true;

globalThis.supabaseClient = supabaseClient;
globalThis.supabase = {
  createClient
};

export {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_CONFIG_ERROR,
  hasSupabaseConfig,
  initializeSupabase,
  supabase,
  supabaseClient
};

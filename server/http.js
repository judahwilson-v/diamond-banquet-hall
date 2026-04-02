export const json = (data, { status = 200, headers = {} } = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      ...headers
    }
  });

export const errorJson = (
  message,
  { status = 400, code = "REQUEST_FAILED", headers = {} } = {}
) =>
  json(
    {
      success: false,
      error: String(message ?? "Request failed."),
      code
    },
    { status, headers }
  );

export const readJson = async (request) => {
  const rawBody = await request.text();

  if (!rawBody.trim()) {
    return {};
  }

  try {
    return JSON.parse(rawBody);
  } catch (_error) {
    const error = new Error("Invalid JSON body.");
    error.status = 400;
    error.code = "INVALID_JSON";
    throw error;
  }
};

export const toErrorResponse = (error, fallbackMessage = "Request failed.") => {
  const status = Number.isInteger(error?.status) ? error.status : 500;
  const code = String(error?.code || "INTERNAL_ERROR");
  const message = String(error?.message || fallbackMessage);
  return errorJson(message, { status, code });
};

import { ensureDatabase, normalizeSiteSettingsRow } from "../../server/database.js";
import { DEFAULT_SITE_SETTINGS_ROW } from "../../server/defaults.js";
import { json, toErrorResponse } from "../../server/http.js";

export const onRequestGet = async (context) => {
  try {
    if (!context.env.DB) {
      return json(normalizeSiteSettingsRow(DEFAULT_SITE_SETTINGS_ROW));
    }

    const db = await ensureDatabase(context.env);
    const row = await db
      .prepare("SELECT * FROM site_settings WHERE id = 1 LIMIT 1")
      .first();

    return json(normalizeSiteSettingsRow(row ?? DEFAULT_SITE_SETTINGS_ROW));
  } catch (error) {
    return toErrorResponse(error, "Unable to load venue settings.");
  }
};

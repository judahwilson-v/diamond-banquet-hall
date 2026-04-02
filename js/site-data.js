import { supabaseClient } from "./supabase-client.js";
import { fallbackBookedDates } from "./bookings.js";
import { fallbackReviews } from "./reviews.js";

export const DEFAULT_SITE_SETTINGS = {
  venueName: "Diamond Banquet Hall",
  shortName: "Diamond",
  locationLabel: "Allapra, Perumbavoor",
  addressLine1: "First Floor, Diamond Arcade, Allapra P.O,",
  addressLine2: "Perumbavoor, Ernakulam, Kerala 683556",
  mapLabel: "Diamond Arcade, Allapra P.O, Perumbavoor",
  phoneDisplay: "+91 99476 81202",
  phoneHref: "tel:+919947681202",
  whatsappDisplay: "+91 99476 81202",
  whatsappHref: "https://wa.me/919947681202",
  instagramHandle: "@diamondhallallapra",
  instagramHref: "https://instagram.com/diamondhallallapra",
  mapsHref: "https://maps.app.goo.gl/vZWrqc6f6b9hvNj88",
  hallPrice: 30000,
  roomPrice: 1500,
  roomCount: 4,
  inquiryHours: "Open for inquiries 9 AM – 9 PM, all days",
  hallStatusOpen: true
};

const GALLERY_BUCKET = "venue-images";
const galleryPriority = ["hero.jpg", "hall1.jpg", "hall2.jpg", "hall3.jpg", "room.jpg", "parking.jpg"];
const galleryAltTextByName = {
  "hero.jpg": "Wide interior view of Diamond Banquet Hall",
  "hall1.jpg": "Banquet hall decorated for a celebration",
  "hall2.jpg": "Hall seating and lighting setup",
  "hall3.jpg": "Stage and entrance area of the banquet hall",
  "room.jpg": "Luxury guest room prepared for visitors",
  "parking.jpg": "Parking and exterior arrival area"
};

const bookedDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const imageFilePattern = /\.(avif|gif|jpe?g|png|webp)$/i;
const bookingTimePattern = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;
const bookingRequestStatuses = ["pending", "booked", "cancelled"];

export const BOOKING_SLOT_START_HOUR = 6;
export const BOOKING_SLOT_END_HOUR = 12;
export const BOOKING_MINIMUM_HOURS = 4;
export const BOOKING_SLOT_DEFINITIONS = Array.from(
  { length: BOOKING_SLOT_END_HOUR - BOOKING_SLOT_START_HOUR },
  (_, index) => {
    const startHour = BOOKING_SLOT_START_HOUR + index;
    const endHour = startHour + 1;
    const start = `${String(startHour).padStart(2, "0")}:00`;
    const end = `${String(endHour).padStart(2, "0")}:00`;

    return {
      index,
      start,
      end,
      label: `${start} - ${end}`
    };
  }
);

const EMAILJS_BOOKING_ADMIN_CONFIG = {
  endpoint: "https://api.emailjs.com/api/v1.0/email/send",
  serviceId: "service_w5z2sz8",
  templateId: "template_a10369t",
  publicKey: "Y107dCKAMhsKLkklw",
  adminEmail: "judahvijai@gmail.com"
};

const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);

const toDigits = (value) => String(value ?? "").replace(/\D/g, "");

const normalizeHttpUrl = (value, fallback) => {
  try {
    const url = new URL(String(value ?? fallback));
    return /^https?:$/.test(url.protocol) ? url.toString() : fallback;
  } catch (error) {
    return fallback;
  }
};

const formatIndianPhoneDisplay = (value, fallback) => {
  const digits = toDigits(value);
  const normalizedDigits =
    digits.length === 10
      ? `91${digits}`
      : digits.length === 12 && digits.startsWith("91")
        ? digits
        : "";

  if (!normalizedDigits) {
    return fallback;
  }

  return `+${normalizedDigits.slice(0, 2)} ${normalizedDigits.slice(2, 7)} ${normalizedDigits.slice(7)}`;
};

const formatPhoneHref = (value, fallback) => {
  const digits = toDigits(value);

  if (digits.length === 10) {
    return `tel:+91${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return `tel:+${digits}`;
  }

  return fallback;
};

const formatWhatsAppHref = (value, fallback) => {
  const digits = toDigits(value);

  if (digits.length === 10) {
    return `https://wa.me/91${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return `https://wa.me/${digits}`;
  }

  return fallback;
};

const normalizeInstagramHandle = (value, fallback) => {
  const cleaned = String(value ?? "")
    .trim()
    .replace(/^@+/, "")
    .replace(/[^a-zA-Z0-9._]/g, "");

  return cleaned ? `@${cleaned}` : fallback;
};

const formatInstagramHref = (handle, fallback) => {
  const cleaned = String(handle ?? "")
    .trim()
    .replace(/^@+/, "")
    .replace(/[^a-zA-Z0-9._]/g, "");

  return cleaned ? `https://instagram.com/${cleaned}` : fallback;
};

const normalizeInteger = (value, fallback, minimum = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= minimum ? Math.round(parsed) : fallback;
};

const normalizeDateList = (dates) =>
  (Array.isArray(dates) ? dates : fallbackBookedDates)
    .filter((value) => typeof value === "string" && bookedDatePattern.test(value))
    .filter((value, index, list) => list.indexOf(value) === index)
    .sort();

const normalizeBookingTime = (value) => {
  const normalized = String(value ?? "").trim();

  if (!bookingTimePattern.test(normalized)) {
    return "";
  }

  return normalized.slice(0, 5);
};

const normalizeBookingText = (value) =>
  String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();

const normalizeBookingEmail = (value) => normalizeBookingText(value).toLowerCase();

const normalizeBookingNotes = (value) =>
  String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const formatBookingNotificationDate = (value) =>
  new Date(`${String(value ?? "").trim()}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

const normalizeBookingPhone = (value) => {
  const digits = toDigits(value);

  if (digits.length === 10) {
    return `91${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return digits;
  }

  return "";
};

const createUuid = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);

  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const segments = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));

  return [
    segments.slice(0, 4).join(""),
    segments.slice(4, 6).join(""),
    segments.slice(6, 8).join(""),
    segments.slice(8, 10).join(""),
    segments.slice(10, 16).join("")
  ].join("-");
};

const normalizeBookingRequestList = (items) =>
  (Array.isArray(items) ? items : [])
    .map((item, index) => ({
      id: item.id ?? `booking-request-${index + 1}`,
      eventDate: String(item.eventDate ?? item.event_date ?? "").trim().slice(0, 10),
      startTime: normalizeBookingTime(item.startTime ?? item.start_time),
      endTime: normalizeBookingTime(item.endTime ?? item.end_time),
      status: String(item.status ?? "pending").trim().toLowerCase()
    }))
    .filter(
      (item) =>
        bookedDatePattern.test(item.eventDate) &&
        item.startTime &&
        item.endTime &&
        bookingRequestStatuses.includes(item.status)
    );

const normalizeReviewList = (items) =>
  (Array.isArray(items) ? items : fallbackReviews)
    .map((item, index) => ({
      id: item.id ?? `review-${index + 1}`,
      name: String(item.name ?? item.reviewer_name ?? "").trim(),
      event: String(item.event ?? item.event_type ?? "").trim(),
      date: String(item.date ?? item.date_label ?? item.event_date ?? "").trim(),
      text: String(item.text ?? item.review_text ?? "").trim()
    }))
    .filter((item) => item.name && item.event && item.date && item.text);

const normalizeEnquiryList = (items) =>
  (Array.isArray(items) ? items : [])
    .map((item) => {
      const phoneDisplay = formatIndianPhoneDisplay(
        item.customer_phone,
        DEFAULT_SITE_SETTINGS.phoneDisplay
      );

      return {
        id: item.id,
        name: String(item.customer_name ?? "").trim(),
        phoneDisplay,
        phoneHref: formatPhoneHref(item.customer_phone ?? phoneDisplay, DEFAULT_SITE_SETTINGS.phoneHref),
        eventDate: String(item.event_date ?? "").trim(),
        message: String(item.message ?? item.comment ?? "").trim(),
        status: String(item.status ?? "new").trim() || "new",
        createdAt: item.created_at ?? ""
      };
    })
    .filter((item) => item.id && item.name);

const titleCase = (value) =>
  String(value ?? "")
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());

const getGalleryAltText = (path, index) => {
  const filename = String(path ?? "").split("/").pop()?.toLowerCase() ?? "";

  if (galleryAltTextByName[filename]) {
    return galleryAltTextByName[filename];
  }

  const readableName = titleCase(filename || `Venue Image ${index + 1}`);
  return `Diamond Banquet Hall - ${readableName}`;
};

const compareGalleryPaths = (left, right) => {
  const leftName = String(left ?? "").toLowerCase();
  const rightName = String(right ?? "").toLowerCase();
  const leftIndex = galleryPriority.indexOf(leftName);
  const rightIndex = galleryPriority.indexOf(rightName);

  if (leftIndex !== -1 || rightIndex !== -1) {
    if (leftIndex === -1) {
      return 1;
    }

    if (rightIndex === -1) {
      return -1;
    }

    return leftIndex - rightIndex;
  }

  return leftName.localeCompare(rightName);
};

export const deriveSiteSettingsSchema = (row = {}) => ({
  hasWhatsAppField: hasOwn(row, "whatsapp_number"),
  pricingFieldMode:
    hasOwn(row, "hall_price") && hasOwn(row, "room_price")
      ? "legacy"
      : hasOwn(row, "hall_price_4hrs") && hasOwn(row, "room_price_night")
        ? "seo"
        : "none",
  hasPricingFields:
    (hasOwn(row, "hall_price") && hasOwn(row, "room_price")) ||
    (hasOwn(row, "hall_price_4hrs") && hasOwn(row, "room_price_night")),
  hasRoomCountField: hasOwn(row, "room_count"),
  hasLocationFields: hasOwn(row, "location_label"),
  hasAddressFields: hasOwn(row, "address_line_1") && hasOwn(row, "address_line_2"),
  hasMapLabelField: hasOwn(row, "map_label"),
  hasInquiryHoursField: hasOwn(row, "inquiry_hours")
});

export const describeSupabaseError = (error, fallbackMessage) => {
  if (error?.code === "SUPABASE_CONFIG_MISSING") {
    return error.message;
  }

  if (error?.code === "PGRST205") {
    return "The hosted data store is not set up yet.";
  }

  if (error?.message === "Invalid login credentials") {
    return "Incorrect email or password.";
  }

  if (error?.name === "AuthRetryableFetchError") {
    return "The hosted data service could not be reached. Check your internet connection and try again.";
  }

  if (error?.status === 401) {
    return "You need to sign in first.";
  }

  if (error?.status === 403) {
    return "You do not have permission to do that.";
  }

  if (error?.message) {
    return error.message;
  }

  return fallbackMessage;
};

export const normalizeSiteSettings = (raw = {}) => {
  const phoneDisplay = formatIndianPhoneDisplay(
    raw.phoneDisplay ?? raw.contact_number ?? raw.contactNumber,
    DEFAULT_SITE_SETTINGS.phoneDisplay
  );
  const whatsappDisplay = formatIndianPhoneDisplay(
    raw.whatsappDisplay ?? raw.whatsapp_number ?? raw.whatsappNumber ?? raw.contact_number,
    DEFAULT_SITE_SETTINGS.whatsappDisplay
  );
  const instagramHandle = normalizeInstagramHandle(
    raw.instagramHandle ?? raw.instagram_handle,
    DEFAULT_SITE_SETTINGS.instagramHandle
  );
  const mapsHref = normalizeHttpUrl(
    raw.mapsHref ?? raw.google_maps_link ?? raw.googleMapsLink,
    DEFAULT_SITE_SETTINGS.mapsHref
  );
  const hallStatusValue = raw.hallStatusOpen ?? raw.hall_status ?? raw.venue_status ?? raw.is_hall_open;

  return {
    venueName: String(raw.venueName ?? raw.hall_name ?? DEFAULT_SITE_SETTINGS.venueName).trim() || DEFAULT_SITE_SETTINGS.venueName,
    shortName: String(raw.shortName ?? DEFAULT_SITE_SETTINGS.shortName).trim() || DEFAULT_SITE_SETTINGS.shortName,
    locationLabel: String(raw.locationLabel ?? raw.location_label ?? DEFAULT_SITE_SETTINGS.locationLabel).trim() || DEFAULT_SITE_SETTINGS.locationLabel,
    addressLine1: String(raw.addressLine1 ?? raw.address_line_1 ?? DEFAULT_SITE_SETTINGS.addressLine1).trim() || DEFAULT_SITE_SETTINGS.addressLine1,
    addressLine2: String(raw.addressLine2 ?? raw.address_line_2 ?? DEFAULT_SITE_SETTINGS.addressLine2).trim() || DEFAULT_SITE_SETTINGS.addressLine2,
    mapLabel: String(raw.mapLabel ?? raw.map_label ?? DEFAULT_SITE_SETTINGS.mapLabel).trim() || DEFAULT_SITE_SETTINGS.mapLabel,
    phoneDisplay,
    phoneHref: formatPhoneHref(raw.phoneHref ?? raw.contact_number ?? raw.contactNumber ?? phoneDisplay, DEFAULT_SITE_SETTINGS.phoneHref),
    whatsappDisplay,
    whatsappHref: formatWhatsAppHref(raw.whatsappHref ?? raw.whatsapp_number ?? raw.whatsappNumber ?? whatsappDisplay, DEFAULT_SITE_SETTINGS.whatsappHref),
    instagramHandle,
    instagramHref: formatInstagramHref(raw.instagramHref ?? instagramHandle, DEFAULT_SITE_SETTINGS.instagramHref),
    mapsHref,
    hallPrice: normalizeInteger(raw.hallPrice ?? raw.hall_price ?? raw.hall_price_4hrs, DEFAULT_SITE_SETTINGS.hallPrice),
    roomPrice: normalizeInteger(raw.roomPrice ?? raw.room_price ?? raw.room_price_night, DEFAULT_SITE_SETTINGS.roomPrice),
    roomCount: normalizeInteger(raw.roomCount ?? raw.room_count, DEFAULT_SITE_SETTINGS.roomCount, 1),
    inquiryHours: String(raw.inquiryHours ?? raw.inquiry_hours ?? DEFAULT_SITE_SETTINGS.inquiryHours).trim() || DEFAULT_SITE_SETTINGS.inquiryHours,
    hallStatusOpen:
      typeof hallStatusValue === "boolean"
        ? hallStatusValue
        : typeof hallStatusValue === "number"
          ? hallStatusValue !== 0
        : String(hallStatusValue ?? "open").trim().toLowerCase() !== "closed"
  };
};

export const buildWhatsAppLink = (baseHref, message) => {
  if (!message) {
    return baseHref;
  }

  const separator = baseHref.includes("?") ? "&" : "?";
  return `${baseHref}${separator}text=${encodeURIComponent(message)}`;
};

export const fetchSiteSettings = async () => {
  const { data, error } = await supabaseClient
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const row = data ?? {};

  return {
    settings: normalizeSiteSettings(row),
    schema: deriveSiteSettingsSchema(row)
  };
};

export const fetchBookedDates = async ({ startDate, endDate } = {}) => {
  const normalizedStartDate = bookedDatePattern.test(String(startDate ?? "").trim())
    ? String(startDate).trim()
    : null;
  const normalizedEndDate = bookedDatePattern.test(String(endDate ?? "").trim())
    ? String(endDate).trim()
    : null;

  const { data, error } = await supabaseClient.rpc("get_public_booked_dates", {
    p_start_date: normalizedStartDate,
    p_end_date: normalizedEndDate
  });

  if (error) {
    throw error;
  }

  return normalizeDateList((data ?? []).map((item) => item.event_date));
};

export const fetchBookingRequests = async ({ startDate, endDate } = {}) => {
  let query = supabaseClient
    .from("booking_requests")
    .select("id, event_date, start_time, end_time, status")
    .in("status", ["pending", "booked"])
    .order("event_date", { ascending: true })
    .order("start_time", { ascending: true });

  if (bookedDatePattern.test(String(startDate ?? "").trim())) {
    query = query.gte("event_date", String(startDate).trim());
  }

  if (bookedDatePattern.test(String(endDate ?? "").trim())) {
    query = query.lte("event_date", String(endDate).trim());
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return normalizeBookingRequestList(data);
};

export const fetchBookingAvailabilityWindow = async ({ startDate, endDate } = {}) => {
  const bookedDates = await fetchBookedDates({ startDate, endDate });

  return {
    bookedDates,
    bookingRequests: [],
    source: "cloudflare-d1"
  };
};

export const getFallbackBookingAvailability = () => {
  const year = new Date().getFullYear();
  const buildFallbackDate = (day) => `${year}-04-${String(day).padStart(2, "0")}`;

  return {
    bookedDates: normalizeDateList([
      buildFallbackDate(6),
      buildFallbackDate(19),
      buildFallbackDate(27)
    ]),
    bookingRequests: []
  };
};

export const fetchReviews = async ({ visibleOnly = false } = {}) => {
  const { data, error } = await supabaseClient
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: true });

  if (error?.code === "PGRST205") {
    return {
      reviews: normalizeReviewList(fallbackReviews),
      source: "fallback",
      warning: error
    };
  }

  if (error) {
    throw error;
  }

  const sourceRows = Array.isArray(data) ? data : [];
  const reviewRows = visibleOnly
    ? sourceRows.filter((item) => item?.is_visible !== false)
    : sourceRows;

  return {
    reviews: normalizeReviewList(reviewRows),
    source: "cloudflare-d1",
    warning: null
  };
};

export const fetchEnquiries = async () => {
  const { data, error } = await supabaseClient
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error?.code === "PGRST205") {
    return {
      enquiries: [],
      source: "missing",
      warning: error
    };
  }

  if (error) {
    throw error;
  }

  return {
    enquiries: normalizeEnquiryList(data),
    source: "cloudflare-d1",
    warning: null
  };
};

export const submitBookingRequest = async (input) => {
  const eventDate = String(input.eventDate ?? "").trim();
  const customerName = normalizeBookingText(input.customerName);
  const customerPhone = normalizeBookingPhone(input.customerPhone);
  const customerEmail = normalizeBookingEmail(input.customerEmail);
  const organisation = normalizeBookingText(input.organisation);
  const eventType = normalizeBookingText(input.eventType || "Other") || "Other";
  const attendeeCount = Number.parseInt(String(input.attendeeCount ?? "").trim(), 10);
  const notes = normalizeBookingNotes(input.notes);
  const enquiryMessage = String(input.enquiryMessage ?? "").trim();

  if (!bookedDatePattern.test(eventDate)) {
    throw new Error("Please choose a valid booking date.");
  }

  if (!customerName) {
    throw new Error("Please enter your name.");
  }

  if (!customerPhone) {
    throw new Error("Please enter a valid phone number.");
  }

  if (!Number.isInteger(attendeeCount) || attendeeCount < 1) {
    throw new Error("Attendee count must be at least 1.");
  }

  if (customerEmail) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(customerEmail)) {
      throw new Error("Please enter a valid email address.");
    }
  }

  const bookingId = createUuid();
  const { data, error } = await supabaseClient.rpc("create_booking_request", {
    p_booking_id: bookingId,
    p_customer_name: customerName,
    p_customer_email: customerEmail || null,
    p_customer_phone: customerPhone,
    p_event_date: eventDate,
    p_guest_count: attendeeCount,
    p_organisation: organisation || null,
    p_event_type: eventType,
    p_notes: notes || null,
    p_enquiry_message: enquiryMessage || null
  });

  if (error) {
    throw error;
  }

  const booking = {
    id: String(data?.id ?? bookingId),
    eventDate: String(data?.event_date ?? eventDate).trim().slice(0, 10),
    status: String(data?.status ?? "pending").trim().toLowerCase() || "pending"
  };

  return {
    booking,
    enquiryMessage
  };
};

export const sendBookingAdminNotification = async (input) => {
  const customerName = normalizeBookingText(input.customerName);
  const customerPhone = normalizeBookingPhone(input.customerPhone);
  const customerEmail = normalizeBookingEmail(input.customerEmail);
  const eventDate = String(input.eventDate ?? "").trim();
  const startTime = normalizeBookingTime(input.startTime);
  const endTime = normalizeBookingTime(input.endTime);
  const eventType = normalizeBookingText(input.eventType || "Other") || "Other";
  const attendeeCount = String(input.attendeeCount ?? "").trim();
  const notes = normalizeBookingNotes(input.notes);

  if (!customerName || !customerPhone || !bookedDatePattern.test(eventDate) || !startTime || !endTime) {
    throw new Error("Booking notification payload is incomplete.");
  }

  const timeRange = `${startTime} - ${endTime}`;
  const response = await fetch(EMAILJS_BOOKING_ADMIN_CONFIG.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      service_id: EMAILJS_BOOKING_ADMIN_CONFIG.serviceId,
      template_id: EMAILJS_BOOKING_ADMIN_CONFIG.templateId,
      user_id: EMAILJS_BOOKING_ADMIN_CONFIG.publicKey,
      template_params: {
        admin_email: EMAILJS_BOOKING_ADMIN_CONFIG.adminEmail,
        name: customerName,
        phone: formatIndianPhoneDisplay(customerPhone, customerPhone),
        email: customerEmail || "Not provided",
        event_date: formatBookingNotificationDate(eventDate),
        time_range: timeRange,
        event_type: eventType,
        attendees: attendeeCount || "Not provided",
        notes: notes || "Not provided"
      }
    })
  });

  if (!response.ok) {
    const errorText = (await response.text()).trim();
    throw new Error(errorText || "Admin email notification could not be sent.");
  }
};

export const fetchGalleryAssets = async () => {
  const { data, error } = await supabaseClient.storage.from(GALLERY_BUCKET).list("", {
    limit: 100,
    sortBy: {
      column: "name",
      order: "asc"
    }
  });

  if (error) {
    throw error;
  }

  const paths = (data ?? [])
    .map((item) => item?.name)
    .filter((name) => typeof name === "string" && imageFilePattern.test(name))
    .sort(compareGalleryPaths);

  if (!paths.length) {
    return [];
  }

  const items = await Promise.all(
    paths.map(async (path, index) => {
      const { data: signedData, error: signedError } = await supabaseClient.storage
        .from(GALLERY_BUCKET)
        .createSignedUrl(path, 60 * 60);

      if (signedError) {
        throw signedError;
      }

      return {
        id: `storage-${index + 1}`,
        path,
        src: signedData?.signedUrl ?? "",
        alt: getGalleryAltText(path, index)
      };
    })
  );

  return items.filter((item) => item.src);
};

export const getCurrentSession = async () => {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
};

export const signInAdmin = async (email, password) => {
  if (!String(email ?? "").trim() || !String(password ?? "").trim()) {
    throw new Error("Enter both your admin email and password.");
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw error;
  }

  return data.session;
};

export const signOutAdmin = async () => {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    throw error;
  }
};

export const saveSiteSettings = async (input, schema) => {
  const normalized = normalizeSiteSettings(input);
  const unsupportedFields = [];
  const contactDigits = toDigits(normalized.phoneDisplay);
  const phonePayload = contactDigits.length === 12 && contactDigits.startsWith("91")
    ? contactDigits.slice(2)
    : contactDigits.length === 10
      ? contactDigits
      : DEFAULT_SITE_SETTINGS.phoneDisplay.replace(/\D/g, "").slice(-10);

  const payload = {
    id: 1,
    hall_name: normalized.venueName,
    contact_number: phonePayload,
    instagram_handle: normalized.instagramHandle,
    google_maps_link: normalized.mapsHref
  };

  if (schema?.hasWhatsAppField) {
    payload.whatsapp_number = toDigits(normalized.whatsappDisplay);
  } else {
    unsupportedFields.push("WhatsApp number");
  }

  if (schema?.hasPricingFields) {
    if (schema.pricingFieldMode === "seo") {
      payload.hall_price_4hrs = normalized.hallPrice;
      payload.room_price_night = normalized.roomPrice;
    } else {
      payload.hall_price = normalized.hallPrice;
      payload.room_price = normalized.roomPrice;
    }

    if (schema.hasRoomCountField) {
      payload.room_count = normalized.roomCount;
    } else {
      unsupportedFields.push("room count");
    }
  } else {
    unsupportedFields.push("pricing fields");
  }

  if (schema?.hasLocationFields) {
    payload.location_label = normalized.locationLabel;
  } else {
    unsupportedFields.push("location label");
  }

  if (schema?.hasAddressFields) {
    payload.address_line_1 = normalized.addressLine1;
    payload.address_line_2 = normalized.addressLine2;
  } else {
    unsupportedFields.push("address fields");
  }

  if (schema?.hasMapLabelField) {
    payload.map_label = normalized.mapLabel;
  } else {
    unsupportedFields.push("map label");
  }

  if (schema?.hasInquiryHoursField) {
    payload.inquiry_hours = normalized.inquiryHours;
  } else {
    unsupportedFields.push("inquiry hours");
  }

  const { data, error } = await supabaseClient
    .from("site_settings")
    .upsert(payload, { onConflict: "id" })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return {
    settings: normalizeSiteSettings(data),
    schema: deriveSiteSettingsSchema(data),
    unsupportedFields
  };
};

export const upsertBookingStatus = async (dateKey, status) => {
  void dateKey;
  void status;

  throw new Error(
    "upsertBookingStatus is no longer supported. Use the admin portal to confirm or cancel booking rows."
  );
};

export const addReview = async (input) => {
  const normalized = normalizeReviewList([
    {
      id: null,
      name: input.name,
      event_type: input.event,
      date_label: input.date,
      review_text: input.text
    }
  ])[0];

  if (!normalized) {
    throw new Error("Name, event, date, and review text are required.");
  }

  const payloadCandidates = [
    {
      name: normalized.name,
      reviewer_name: normalized.name,
      event_type: normalized.event,
      date_label: normalized.date,
      event_date: normalized.date,
      review_text: normalized.text,
      is_visible: true
    },
    {
      name: normalized.name,
      event_type: normalized.event,
      date_label: normalized.date,
      review_text: normalized.text
    },
    {
      reviewer_name: normalized.name,
      event_type: normalized.event,
      event_date: normalized.date,
      review_text: normalized.text,
      is_visible: true
    }
  ];

  let lastError = null;

  for (const payload of payloadCandidates) {
    const { data, error } = await supabaseClient
      .from("reviews")
      .insert(payload)
      .select("*")
      .single();

    if (!error) {
      return normalizeReviewList([data])[0];
    }

    lastError = error;

    if (!/column|reviewer_name|event_date|date_label|name/i.test(String(error.message ?? ""))) {
      throw error;
    }
  }

  throw lastError ?? new Error("Unable to add review.");
};

export const deleteReview = async (id) => {
  const { error } = await supabaseClient
    .from("reviews")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
};

export const updateEnquiryStatus = async (id, status) => {
  const allowedStatuses = ["new", "contacted", "booked", "cancelled"];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Enquiry status is invalid.");
  }

  const { data, error } = await supabaseClient
    .from("enquiries")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return normalizeEnquiryList([data])[0];
};

export const deleteEnquiry = async (id) => {
  const { error } = await supabaseClient
    .from("enquiries")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
};

export const subscribeToVenueUpdates = ({
  onBookingsChange,
  onBookingRequestsChange,
  onReviewsChange,
  onSettingsChange,
  onError
} = {}) => {
  const channels = [];
  const subscriptions = [
    {
      table: "bookings",
      callback: onBookingsChange
    },
    {
      table: "booking_requests",
      callback: onBookingRequestsChange
    },
    {
      table: "reviews",
      callback: onReviewsChange
    },
    {
      table: "site_settings",
      callback: onSettingsChange
    }
  ].filter((subscription) => typeof subscription.callback === "function");

  subscriptions.forEach((subscription) => {
    const channel = supabaseClient
      .channel(`diamond-live-${subscription.table}-${Math.random().toString(36).slice(2, 10)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: subscription.table },
        (payload) => subscription.callback?.(payload)
      )
      .subscribe((status, error) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          onError?.(error ?? new Error("Live data sync is temporarily unavailable."));
        }
      });

    channels.push(channel);
  });

  return () => {
    channels.forEach((channel) => {
      void supabaseClient.removeChannel(channel);
    });
  };
};

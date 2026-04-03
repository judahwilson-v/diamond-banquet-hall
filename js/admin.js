import {
  clearLocalAdminSession,
  describeSupabaseError,
  isSupabaseSessionError
} from "./site-data.js";
import { SUPABASE_CONFIG_ERROR, initializeSupabase } from "./supabase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const VALID_STATUSES = new Set(["pending", "confirmed", "cancelled"]);
  const ENQUIRY_STATUSES = new Set(["new", "contacted", "booked", "cancelled"]);
  const GALLERY_BUCKET = "venue-images";
  const IMAGE_FILE_PATTERN = /\.(avif|gif|jpe?g|png|webp)$/i;
  const GALLERY_PRIORITY = ["hero.jpg", "hall1.jpg", "hall2.jpg", "hall3.jpg", "room.jpg", "parking.jpg"];
  const ROLE_LABELS = {
    super_admin: "Super Admin",
    staff_admin: "Staff Admin"
  };
  const VIEW_CONFIG = {
    dashboard: {
      title: "Dashboard",
      subtitle: "Monitor live booking pressure, confirmed dates, and enquiry activity."
    },
    bookings: {
      title: "Bookings",
      subtitle: "Filter the live queue, approve or cancel requests, and edit protected records safely."
    },
    settings: {
      title: "Settings",
      subtitle: "Manage pricing, inspect connection health, and update venue controls by role."
    }
  };

  const state = {
    client: null,
    session: null,
    admin: null,
    bookings: new Map(),
    enquiries: new Map(),
    siteSettings: null,
    galleryAssets: [],
    pendingBookingIds: new Set(),
    pendingEnquiryIds: new Set(),
    pendingGalleryPaths: new Set(),
    channel: null,
    activeView: "bookings",
    lastSyncAt: null,
    realtimeStatus: "Connecting...",
    realtimeNote: "Waiting for the shared live channel.",
    filters: {
      search: "",
      status: "all",
      specificDate: "",
      startDate: "",
      endDate: ""
    },
    searchTimer: 0,
    savingPricing: false,
    savingProfile: false,
    uploadingGallery: false,
    modal: {
      type: null,
      targetId: null,
      onAccept: null,
      busy: false
    }
  };

  const refs = {};
  const REQUIRED_BOOT_REFS = [
    "app",
    "loadingOverlay",
    "loadingText",
    "loadingActions",
    "retryButton",
    "modalLayer",
    "bookingForm",
    "bookingFormStatus",
    "confirmPanel",
    "confirmAccept",
    "confirmCancel"
  ];

  console.log("Admin JS Loaded");
  cacheDom();
  bindEvents();

  if (!hasRequiredRefs("startup", REQUIRED_BOOT_REFS)) {
    return;
  }

  if (SUPABASE_CONFIG_ERROR) {
    state.client = null;
    setLoadingState(
      describeSupabaseError(
        SUPABASE_CONFIG_ERROR,
        "Missing runtime config. Build and deploy the generated runtime-config.js file."
      ),
      true
    );
    return;
  }

  void initializePortal();

  function cacheDom() {
    refs.app = document.getElementById("admin-app");
    refs.loadingOverlay = document.getElementById("admin-loading-overlay");
    refs.loadingText = document.getElementById("admin-loading-text");
    refs.loadingActions = document.getElementById("admin-loading-actions");
    refs.retryButton = document.getElementById("admin-retry");
    refs.toastStack = document.getElementById("toast-stack");
    refs.logoutButton = document.getElementById("admin-logout");
    refs.refreshButton = document.getElementById("admin-refresh");
    refs.navButtons = Array.from(document.querySelectorAll(".admin-nav__button"));
    refs.headerEyebrow = document.getElementById("admin-header-eyebrow");
    refs.pageTitle = document.getElementById("admin-page-title");
    refs.pageSubtitle = document.getElementById("admin-page-subtitle");
    refs.userEmail = document.getElementById("admin-user-email");
    refs.userRole = document.getElementById("admin-user-role");
    refs.fetchState = document.getElementById("admin-fetch-state");
    refs.emptyState = document.getElementById("admin-empty-state");
    refs.tableWrap = document.getElementById("admin-table-wrap");
    refs.tableBody = document.getElementById("bookings-table-body");
    refs.filterSummary = document.getElementById("admin-filter-summary");
    refs.searchInput = document.getElementById("booking-search");
    refs.statusFilter = document.getElementById("booking-status-filter");
    refs.specificDateFilter = document.getElementById("booking-specific-date");
    refs.startDateFilter = document.getElementById("booking-start-date");
    refs.endDateFilter = document.getElementById("booking-end-date");
    refs.clearFiltersButton = document.getElementById("booking-clear-filters");
    refs.views = {
      dashboard: document.getElementById("view-dashboard"),
      bookings: document.getElementById("view-bookings"),
      settings: document.getElementById("view-settings")
    };
    refs.kpiTotal = document.getElementById("kpi-total");
    refs.kpiPending = document.getElementById("kpi-pending");
    refs.kpiConfirmed = document.getElementById("kpi-confirmed");
    refs.kpiCancelled = document.getElementById("kpi-cancelled");
    refs.dashboardSummary = document.getElementById("dashboard-summary");
    refs.dashboardNextBooking = document.getElementById("dashboard-next-booking");
    refs.dashboardEnquiriesSurface = document.getElementById("dashboard-enquiries-surface");
    refs.dashboardEnquiriesSummary = document.getElementById("dashboard-enquiries-summary");
    refs.dashboardEnquiriesEmpty = document.getElementById("dashboard-enquiries-empty");
    refs.dashboardEnquiriesWrap = document.getElementById("dashboard-enquiries-wrap");
    refs.dashboardEnquiriesBody = document.getElementById("dashboard-enquiries-body");
    refs.sidebarSyncStatus = document.getElementById("sidebar-sync-status");
    refs.sidebarSyncNote = document.getElementById("sidebar-sync-note");
    refs.settingsSessionEmail = document.getElementById("settings-session-email");
    refs.settingsSessionRole = document.getElementById("settings-session-role");
    refs.settingsRealtimeStatus = document.getElementById("settings-realtime-status");
    refs.settingsLastSync = document.getElementById("settings-last-sync");
    refs.settingsRowCount = document.getElementById("settings-row-count");
    refs.settingsEnquiryCountRow = document.getElementById("settings-enquiry-count-row");
    refs.settingsEnquiryCount = document.getElementById("settings-enquiry-count");
    refs.pricingForm = document.getElementById("pricing-form");
    refs.pricingHallPrice = document.getElementById("settings-hall-price");
    refs.pricingRoomPrice = document.getElementById("settings-room-price");
    refs.pricingRoomCount = document.getElementById("settings-room-count");
    refs.pricingStatus = document.getElementById("pricing-form-status");
    refs.pricingSaveButton = document.getElementById("pricing-save-button");
    refs.siteProfileSurface = document.getElementById("site-profile-surface");
    refs.siteProfileForm = document.getElementById("site-profile-form");
    refs.siteProfileStatus = document.getElementById("site-profile-status");
    refs.siteProfileSaveButton = document.getElementById("site-profile-save-button");
    refs.profileHallName = document.getElementById("settings-hall-name");
    refs.profileContactNumber = document.getElementById("settings-contact-number");
    refs.profileWhatsappNumber = document.getElementById("settings-whatsapp-number");
    refs.profileInstagramHandle = document.getElementById("settings-instagram-handle");
    refs.profileGoogleMapsLink = document.getElementById("settings-google-maps-link");
    refs.profileLocationLabel = document.getElementById("settings-location-label");
    refs.profileMapLabel = document.getElementById("settings-map-label");
    refs.profileAddressLine1 = document.getElementById("settings-address-line-1");
    refs.profileAddressLine2 = document.getElementById("settings-address-line-2");
    refs.profileInquiryHours = document.getElementById("settings-inquiry-hours");
    refs.profileHallOpen = document.getElementById("settings-hall-open");
    refs.galleryManagerSurface = document.getElementById("gallery-manager-surface");
    refs.galleryCaption = document.getElementById("gallery-caption");
    refs.galleryUploadForm = document.getElementById("gallery-upload-form");
    refs.galleryUploadInput = document.getElementById("gallery-upload-input");
    refs.galleryUploadStatus = document.getElementById("gallery-upload-status");
    refs.galleryUploadButton = document.getElementById("gallery-upload-button");
    refs.galleryRefreshButton = document.getElementById("gallery-refresh-button");
    refs.galleryLoadingState = document.getElementById("gallery-loading-state");
    refs.galleryEmptyState = document.getElementById("gallery-empty-state");
    refs.galleryGrid = document.getElementById("gallery-grid");
    refs.modalLayer = document.getElementById("admin-modal-layer");
    refs.modalClose = document.getElementById("admin-modal-close");
    refs.modalEyebrow = document.getElementById("admin-modal-eyebrow");
    refs.modalTitle = document.getElementById("admin-modal-title");
    refs.modalCopy = document.getElementById("admin-modal-copy");
    refs.bookingForm = document.getElementById("admin-booking-form");
    refs.bookingFormStatus = document.getElementById("admin-booking-form-status");
    refs.bookingModalNameField = document.getElementById("booking-modal-name-field");
    refs.bookingModalEmailField = document.getElementById("booking-modal-email-field");
    refs.bookingModalName = document.getElementById("booking-modal-name");
    refs.bookingModalEmail = document.getElementById("booking-modal-email");
    refs.bookingModalDate = document.getElementById("booking-modal-date");
    refs.bookingModalGuests = document.getElementById("booking-modal-guests");
    refs.bookingModalStatus = document.getElementById("booking-modal-status");
    refs.bookingOverrideRow = document.getElementById("booking-override-row");
    refs.bookingOverrideCheckbox = document.getElementById("booking-override-conflict");
    refs.bookingModalCancel = document.getElementById("admin-modal-cancel");
    refs.bookingSaveButton = document.getElementById("admin-booking-save");
    refs.confirmPanel = document.getElementById("admin-confirm-panel");
    refs.confirmWarning = document.getElementById("admin-confirm-warning");
    refs.confirmCancel = document.getElementById("admin-confirm-cancel");
    refs.confirmAccept = document.getElementById("admin-confirm-accept");
  }

  function hasRequiredRefs(context, refNames) {
    const missing = refNames.filter((refName) => !refs[refName]);

    if (!missing.length) {
      return true;
    }

    console.error(`[diamond-admin] ${context} missing required element(s): ${missing.join(", ")}`);
    return false;
  }

  function runSafely(context, callback) {
    try {
      return callback();
    } catch (error) {
      console.error(`[diamond-admin] ${context} failed.`, error);
      return undefined;
    }
  }

  async function runSafelyAsync(context, callback) {
    try {
      return await callback();
    } catch (error) {
      console.error(`[diamond-admin] ${context} failed.`, error);
      return undefined;
    }
  }

  function reportBootFailure(message, error) {
    state.client = null;

    if (error) {
      console.error(message, error);
    }

    setLoadingState(message, true);
  }

  function bindEvents() {
    refs.retryButton?.addEventListener("click", () => {
      void runSafelyAsync("Retry button", async () => {
        await initializePortal();
      });
    });

    refs.refreshButton?.addEventListener("click", () => {
      void runSafelyAsync("Refresh button", async () => {
        await fetchBookings({ silent: false });
      });
    });

    refs.logoutButton?.addEventListener("click", () => {
      void runSafelyAsync("Logout button", async () => {
        await handleLogout();
      });
    });

    refs.navButtons.forEach((button) => {
      button.addEventListener("click", () => {
        runSafely("Navigation button", () => {
          setActiveView(button.dataset.view);
        });
      });
    });

    refs.searchInput?.addEventListener("input", () => {
      runSafely("Search input", () => {
        window.clearTimeout(state.searchTimer);
        state.searchTimer = window.setTimeout(() => {
          runSafely("Search input debounce", () => {
            state.filters.search = String(refs.searchInput?.value || "").trim().toLowerCase();
            renderTable();
          });
        }, 180);
      });
    });

    refs.statusFilter?.addEventListener("change", () => {
      runSafely("Status filter", () => {
        state.filters.status = String(refs.statusFilter?.value || "all").trim().toLowerCase() || "all";
        renderTable();
      });
    });

    refs.specificDateFilter?.addEventListener("change", () => {
      runSafely("Specific date filter", () => {
        state.filters.specificDate = normalizeDateValue(refs.specificDateFilter?.value);
        renderTable();
      });
    });

    refs.startDateFilter?.addEventListener("change", () => {
      runSafely("Start date filter", () => {
        state.filters.startDate = normalizeDateValue(refs.startDateFilter?.value);
        renderTable();
      });
    });

    refs.endDateFilter?.addEventListener("change", () => {
      runSafely("End date filter", () => {
        state.filters.endDate = normalizeDateValue(refs.endDateFilter?.value);
        renderTable();
      });
    });

    refs.clearFiltersButton?.addEventListener("click", () => {
      runSafely("Clear filters button", () => {
        clearFilters();
      });
    });

    refs.tableBody?.addEventListener("click", (event) => {
      runSafely("Bookings table click", () => {
        const target =
          event.target instanceof Element ? event.target.closest("button[data-action][data-booking-id]") : null;

        if (!target) {
          return;
        }

        const bookingId = target.dataset.bookingId;
        const action = target.dataset.action;

        if (!bookingId || !action) {
          return;
        }

        if (action === "approve") {
          void runSafelyAsync("Approve booking action", async () => {
            await handleApproveAction(bookingId);
          });
        }

        if (action === "cancel") {
          void runSafelyAsync("Cancel booking action", async () => {
            await saveBooking({
              bookingId,
              status: "cancelled",
              successMessage: "Booking cancelled successfully."
            });
          });
        }

        if (action === "edit") {
          openBookingModal(bookingId);
        }

        if (action === "delete") {
          openDeleteBookingConfirm(bookingId);
        }
      });
    });

    refs.dashboardEnquiriesBody?.addEventListener("click", (event) => {
      runSafely("Enquiries table click", () => {
        const target =
          event.target instanceof Element ? event.target.closest("button[data-action][data-enquiry-id]") : null;

        if (!target) {
          return;
        }

        const enquiryId = Number(target.dataset.enquiryId);
        const action = target.dataset.action;

        if (!Number.isFinite(enquiryId) || !action) {
          return;
        }

        if (action === "contacted" || action === "booked" || action === "cancelled") {
          void runSafelyAsync("Update enquiry status", async () => {
            await updateEnquiryStatus(enquiryId, action);
          });
        }

        if (action === "delete-enquiry") {
          openDeleteEnquiryConfirm(enquiryId);
        }
      });
    });

    refs.pricingForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      void runSafelyAsync("Pricing form submit", async () => {
        await savePricingSettings();
      });
    });

    refs.siteProfileForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      void runSafelyAsync("Site profile form submit", async () => {
        await saveSiteProfile();
      });
    });

    refs.galleryUploadForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      void runSafelyAsync("Gallery upload form submit", async () => {
        await uploadGalleryAssets();
      });
    });

    refs.galleryRefreshButton?.addEventListener("click", () => {
      void runSafelyAsync("Gallery refresh click", async () => {
        await fetchGalleryAssets();
      });
    });

    refs.galleryGrid?.addEventListener("click", (event) => {
      runSafely("Gallery grid click", () => {
        const target = event.target instanceof HTMLElement ? event.target.closest("[data-gallery-action]") : null;

        if (!target) {
          return;
        }

        const galleryPath = String(target.dataset.galleryPath || "").trim();
        const action = String(target.dataset.galleryAction || "").trim();

        if (!galleryPath || action !== "delete-gallery") {
          return;
        }

        openDeleteGalleryAssetConfirm(galleryPath);
      });
    });

    const form = document.getElementById("admin-booking-form");

    if (!form) {
      console.error("Form not found");
    } else {
      console.log("Form detected");
      refs.bookingForm = form;

      if (form.dataset.submitListenerAttached !== "true") {
        form.dataset.submitListenerAttached = "true";
        form.addEventListener("submit", async (event) => {
          event.preventDefault();
          console.log("Submit clicked");
          console.log("FORM SUBMIT WORKING");
          await runSafelyAsync("Booking form submit", async () => {
            await handleBookingFormSubmit();
          });
        });
      }
    }

    refs.bookingModalDate?.addEventListener("input", () => {
      runSafely("Booking modal date input", () => {
        syncBookingOverrideAvailability();
      });
    });
    refs.bookingModalStatus?.addEventListener("change", () => {
      runSafely("Booking modal status change", () => {
        syncBookingOverrideAvailability();
      });
    });

    refs.modalClose?.addEventListener("click", () => {
      runSafely("Modal close button", () => {
        closeModal();
      });
    });
    refs.bookingModalCancel?.addEventListener("click", () => {
      runSafely("Booking modal cancel button", () => {
        closeModal();
      });
    });
    refs.confirmCancel?.addEventListener("click", () => {
      runSafely("Confirm modal cancel button", () => {
        closeModal();
      });
    });
    refs.confirmAccept?.addEventListener("click", () => {
      void runSafelyAsync("Confirm modal accept button", async () => {
        await handleConfirmAccept();
      });
    });

    refs.modalLayer?.addEventListener("click", (event) => {
      runSafely("Modal backdrop click", () => {
        if (event.target === refs.modalLayer && !state.modal.busy) {
          closeModal();
        }
      });
    });

    window.addEventListener("keydown", (event) => {
      runSafely("Window keydown", () => {
        if (event.key === "Escape" && !refs.modalLayer?.hidden && !state.modal.busy) {
          closeModal();
        }
      });
    });

    window.addEventListener("beforeunload", () => {
      runSafely("Window beforeunload", () => {
        cleanupRealtimeChannel();
      });
    });
  }

  async function initializePortal() {
    if (!hasRequiredRefs("initializePortal", REQUIRED_BOOT_REFS)) {
      return;
    }

    cleanupRealtimeChannel();
    window.clearTimeout(state.searchTimer);
    state.bookings = new Map();
    state.enquiries = new Map();
    state.siteSettings = null;
    state.galleryAssets = [];
    state.pendingBookingIds.clear();
    state.pendingEnquiryIds.clear();
    state.pendingGalleryPaths.clear();
    state.lastSyncAt = null;
    state.savingPricing = false;
    state.savingProfile = false;
    state.uploadingGallery = false;
    closeModal();
    setRealtimeStatus("Connecting...", "Waiting for bookings, enquiries, and settings channels.");
    setLoadingState("Checking your session and loading the shared Supabase workspace.");
    refs.app.hidden = true;

    try {
      if (SUPABASE_CONFIG_ERROR) {
        reportBootFailure(
          describeSupabaseError(
            SUPABASE_CONFIG_ERROR,
            "Missing runtime config. Build and deploy the generated runtime-config.js file."
          ),
          SUPABASE_CONFIG_ERROR
        );
        return;
      }

      const client = await initializeSupabase();

      if (!client) {
        throw SUPABASE_CONFIG_ERROR ?? new Error("Supabase client could not be initialized.");
      }

      state.client = client;

      const {
        data: { session },
        error: sessionError
      } = await state.client.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      if (!session) {
        window.location.replace("login.html");
        return;
      }

      state.session = session;
      await verifyAdminAccess();
      syncIdentity();
      setActiveView(state.activeView);
      refs.app.hidden = false;

      await Promise.all([
        fetchBookings({ silent: true }),
        fetchSiteSettings(),
        isSuperAdmin() ? fetchEnquiries({ silent: true }) : Promise.resolve(),
        isSuperAdmin() ? fetchGalleryAssets({ silent: true }) : Promise.resolve()
      ]);

      subscribeToRealtime();
      hideLoadingState();
    } catch (error) {
      await handleInitializationError(error);
    }
  }

  async function verifyAdminAccess() {
    const email = String(state.session?.user?.email || "").trim().toLowerCase();

    if (!email) {
      throw new Error("This session does not include an admin email address.");
    }

    const { data, error } = await state.client
      .from("admin_users")
      .select("email, role")
      .ilike("email", email)
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      showToast("This account is not allowlisted for the admin portal.", "error");
      await clearLocalAdminSession().catch(() => {});
      window.setTimeout(() => {
        window.location.replace("login.html");
      }, 320);
      throw new Error("Access denied.");
    }

    state.admin = {
      email: String(data.email || email).trim(),
      role: normalizeAdminRole(data.role)
    };
  }

  async function handleInitializationError(error) {
    const message = describeError(error, "The admin portal could not be loaded.");

    if (message === "Access denied.") {
      return;
    }

    if (isSupabaseSessionError(error)) {
      await clearLocalAdminSession().catch((clearError) => {
        console.error("[diamond-admin] Unable to clear the local admin session.", clearError);
      });
      showToast(message, "error");
      window.setTimeout(() => {
        window.location.replace("login.html");
      }, 320);
      return;
    }

    console.error("[diamond-admin] Initialization failed.", error);
    setLoadingState(message, true);
    showToast(message, "error");
  }

  async function fetchBookings({ silent = false } = {}) {
    if (!state.client) {
      return;
    }

    if (refs.fetchState) {
      refs.fetchState.hidden = false;
    }

    try {
      const { data, error } = await state.client
        .from("bookings")
        .select("id, customer_name, customer_email, event_date, guest_count, status, created_at")
        .order("event_date", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      state.bookings = new Map();

      (data || []).forEach((row) => {
        const booking = normalizeBooking(row);

        if (booking.id) {
          state.bookings.set(booking.id, booking);
        }
      });

      touchSync();
      renderDashboard();
      renderTable();
      renderSettings();
    } catch (error) {
      console.error("[diamond-admin] Unable to fetch bookings.", error);

      if (!silent) {
        showToast(describeError(error, "Unable to load bookings."), "error");
      }

      setRealtimeStatus("Manual refresh required", "The last fetch failed. Try again.");
    } finally {
      if (refs.fetchState) {
        refs.fetchState.hidden = true;
      }
    }
  }

  async function fetchEnquiries({ silent = false } = {}) {
    if (!state.client || !isSuperAdmin()) {
      return;
    }

    try {
      const { data, error } = await state.client
        .from("enquiries")
        .select("id, customer_name, customer_phone, event_date, message, status, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      state.enquiries = new Map();

      (data || []).forEach((row) => {
        const enquiry = normalizeEnquiry(row);

        if (Number.isFinite(enquiry.id)) {
          state.enquiries.set(enquiry.id, enquiry);
        }
      });

      touchSync();
      renderDashboard();
      renderSettings();
    } catch (error) {
      console.error("[diamond-admin] Unable to fetch enquiries.", error);

      if (!silent) {
        showToast(describeError(error, "Unable to load enquiries."), "error");
      }
    }
  }

  async function fetchSiteSettings() {
    if (!state.client) {
      return;
    }

    try {
      const { data, error } = await state.client
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      state.siteSettings = normalizeSiteSettingsRow(data || {});
      touchSync();
      renderSettings();
    } catch (error) {
      console.error("[diamond-admin] Unable to load site settings.", error);
      showToast(describeError(error, "Unable to load venue settings."), "error");
    }
  }

  async function fetchGalleryAssets({ silent = false } = {}) {
    if (!state.client || !isSuperAdmin()) {
      return;
    }

    if (refs.galleryLoadingState) {
      refs.galleryLoadingState.hidden = false;
    }

    try {
      const { data, error } = await state.client.storage.from(GALLERY_BUCKET).list("", {
        limit: 100,
        sortBy: {
          column: "name",
          order: "asc"
        }
      });

      if (error) {
        throw error;
      }

      const paths = (data || [])
        .filter((item) => typeof item?.name === "string" && IMAGE_FILE_PATTERN.test(item.name))
        .sort((left, right) => compareGalleryPaths(left?.name, right?.name));

      const items = await Promise.all(
        paths.map(async (item) => {
          try {
            const { data: signedData, error: signedError } = await state.client.storage
              .from(GALLERY_BUCKET)
              .createSignedUrl(item.name, 60 * 60);

            if (signedError) {
              throw signedError;
            }

            return {
              path: item.name,
              src: signedData?.signedUrl || "",
              size: Number(item.metadata?.size || 0),
              updatedAt: item.updated_at || item.created_at || ""
            };
          } catch (assetError) {
            console.error("[diamond-admin] Unable to sign gallery asset URL.", item?.name, assetError);
            return null;
          }
        })
      );

      state.galleryAssets = items.filter((item) => item?.path && item?.src);
      touchSync();
      renderGalleryManager();
    } catch (error) {
      console.error("[diamond-admin] Unable to load gallery assets.", error);

      if (!silent) {
        const message = describeError(error, "Unable to load gallery images.");
        setStatus(refs.galleryUploadStatus, message, "error");
        showToast(message, "error");
      }
    } finally {
      if (refs.galleryLoadingState) {
        refs.galleryLoadingState.hidden = true;
      }
    }
  }

  function renderTable() {
    if (!hasRequiredRefs("renderTable", ["tableBody", "filterSummary", "emptyState", "tableWrap"])) {
      return;
    }

    const allBookings = getSortedBookings();
    const filteredBookings = getFilteredBookings(allBookings);
    const confirmedByDate = new Map();
    const fragment = document.createDocumentFragment();

    allBookings.forEach((booking) => {
      if (booking.status === "confirmed") {
        confirmedByDate.set(booking.eventDate, booking.id);
      }
    });

    refs.tableBody.textContent = "";
    refs.filterSummary.textContent = `Showing ${filteredBookings.length} of ${allBookings.length} bookings.`;

    if (!filteredBookings.length) {
      refs.emptyState.hidden = false;
      refs.tableWrap.hidden = true;
      return;
    }

    filteredBookings.forEach((booking) => {
      const row = document.createElement("tr");
      const isBusy = state.pendingBookingIds.has(booking.id);
      const conflictingConfirmedId = confirmedByDate.get(booking.eventDate);
      const hasConflict =
        booking.status !== "confirmed" &&
        Boolean(conflictingConfirmedId) &&
        conflictingConfirmedId !== booking.id;

      row.append(
        buildCell(
          "Name",
          buildNameCell(booking.customerName, `Requested ${formatDateTime(booking.createdAt)}`)
        ),
        buildCell("Email", booking.customerEmail || "No email supplied"),
        buildCell("Date", formatDate(booking.eventDate)),
        buildCell("Guests", booking.guestCount ? String(booking.guestCount) : "Not provided"),
        buildCell("Status", buildStatusBadge(booking.status)),
        buildCell(
          "Actions",
          buildBookingActionsCell({
            booking,
            isBusy,
            hasConflict
          })
        )
      );

      fragment.append(row);
    });

    refs.tableBody.append(fragment);
    refs.emptyState.hidden = true;
    refs.tableWrap.hidden = false;
  }

  function renderDashboard() {
    if (
      !hasRequiredRefs("renderDashboard", [
        "kpiTotal",
        "kpiPending",
        "kpiConfirmed",
        "kpiCancelled",
        "dashboardSummary",
        "dashboardNextBooking",
        "dashboardEnquiriesSurface",
        "dashboardEnquiriesSummary",
        "dashboardEnquiriesBody",
        "dashboardEnquiriesEmpty",
        "dashboardEnquiriesWrap"
      ])
    ) {
      return;
    }

    const bookings = getSortedBookings();
    const counts = countStatuses(bookings);
    const nextConfirmed = bookings.find((booking) => booking.status === "confirmed");

    refs.kpiTotal.textContent = String(bookings.length);
    refs.kpiPending.textContent = String(counts.pending);
    refs.kpiConfirmed.textContent = String(counts.confirmed);
    refs.kpiCancelled.textContent = String(counts.cancelled);
    refs.dashboardSummary.textContent =
      counts.pending > 0
        ? `${counts.pending} request${counts.pending === 1 ? "" : "s"} need action. ${counts.confirmed} confirmed date${counts.confirmed === 1 ? "" : "s"} are currently blocking the public calendar.`
        : `No pending requests. ${counts.confirmed} confirmed date${counts.confirmed === 1 ? "" : "s"} are currently holding the calendar.`;
    refs.dashboardNextBooking.textContent = nextConfirmed
      ? `${formatDate(nextConfirmed.eventDate)} • ${nextConfirmed.customerName}`
      : "No confirmed bookings are scheduled yet.";

    if (!isSuperAdmin()) {
      refs.dashboardEnquiriesSurface.hidden = true;
      return;
    }

    const enquiries = getSortedEnquiries();
    const fragment = document.createDocumentFragment();

    refs.dashboardEnquiriesSurface.hidden = false;
    refs.dashboardEnquiriesSummary.textContent = `${enquiries.length} enquir${
      enquiries.length === 1 ? "y" : "ies"
    } in the live queue.`;
    refs.dashboardEnquiriesBody.textContent = "";

    if (!enquiries.length) {
      refs.dashboardEnquiriesEmpty.hidden = false;
      refs.dashboardEnquiriesWrap.hidden = true;
      return;
    }

    enquiries.forEach((enquiry) => {
      const row = document.createElement("tr");
      const isBusy = state.pendingEnquiryIds.has(enquiry.id);

      row.append(
        buildCell("Name", buildNameCell(enquiry.customerName, formatDateTime(enquiry.createdAt))),
        buildCell("Phone", enquiry.customerPhone || "Not provided"),
        buildCell("Date", enquiry.eventDate ? formatDate(enquiry.eventDate) : "Not provided"),
        buildCell("Status", buildStatusBadge(enquiry.status)),
        buildCell("Message", enquiry.message || "No message supplied"),
        buildCell("Actions", buildEnquiryActionsCell(enquiry, isBusy))
      );

      fragment.append(row);
    });

    refs.dashboardEnquiriesBody.append(fragment);
    refs.dashboardEnquiriesEmpty.hidden = true;
    refs.dashboardEnquiriesWrap.hidden = false;
  }

  function renderSettings() {
    if (
      !hasRequiredRefs("renderSettings", [
        "userEmail",
        "userRole",
        "settingsSessionEmail",
        "settingsSessionRole",
        "settingsRealtimeStatus",
        "settingsLastSync",
        "settingsRowCount",
        "settingsEnquiryCountRow",
        "settingsEnquiryCount",
        "siteProfileSurface",
        "pricingHallPrice",
        "pricingRoomPrice",
        "pricingRoomCount",
        "profileHallName",
        "profileContactNumber",
        "profileWhatsappNumber",
        "profileInstagramHandle",
        "profileGoogleMapsLink",
        "profileLocationLabel",
        "profileMapLabel",
        "profileAddressLine1",
        "profileAddressLine2",
        "profileInquiryHours",
        "profileHallOpen"
      ])
    ) {
      return;
    }

    refs.userEmail.textContent = state.admin?.email || "--";
    refs.userRole.textContent = formatRole(state.admin?.role || "");
    refs.settingsSessionEmail.textContent = state.admin?.email || "--";
    refs.settingsSessionRole.textContent = formatRole(state.admin?.role || "");
    refs.settingsRealtimeStatus.textContent = state.realtimeStatus;
    refs.settingsLastSync.textContent = state.lastSyncAt
      ? formatDateTime(state.lastSyncAt)
      : "Awaiting first fetch";
    refs.settingsRowCount.textContent = String(state.bookings.size);

    if (isSuperAdmin()) {
      refs.settingsEnquiryCountRow.hidden = false;
      refs.settingsEnquiryCount.textContent = String(state.enquiries.size);
      refs.siteProfileSurface.hidden = false;
      if (refs.galleryManagerSurface) {
        refs.galleryManagerSurface.hidden = false;
      }
    } else {
      refs.settingsEnquiryCountRow.hidden = true;
      refs.siteProfileSurface.hidden = true;
      if (refs.galleryManagerSurface) {
        refs.galleryManagerSurface.hidden = true;
      }
    }

    if (!state.siteSettings) {
      renderGalleryManager();
      return;
    }

    refs.pricingHallPrice.value = String(state.siteSettings.hallPrice);
    refs.pricingRoomPrice.value = String(state.siteSettings.roomPrice);
    refs.pricingRoomCount.value = String(state.siteSettings.roomCount);

    if (isSuperAdmin()) {
      refs.profileHallName.value = state.siteSettings.hallName;
      refs.profileContactNumber.value = state.siteSettings.contactNumber;
      refs.profileWhatsappNumber.value = state.siteSettings.whatsappNumber;
      refs.profileInstagramHandle.value = state.siteSettings.instagramHandle;
      refs.profileGoogleMapsLink.value = state.siteSettings.googleMapsLink;
      refs.profileLocationLabel.value = state.siteSettings.locationLabel;
      refs.profileMapLabel.value = state.siteSettings.mapLabel;
      refs.profileAddressLine1.value = state.siteSettings.addressLine1;
      refs.profileAddressLine2.value = state.siteSettings.addressLine2;
      refs.profileInquiryHours.value = state.siteSettings.inquiryHours;
      refs.profileHallOpen.value = state.siteSettings.hallStatusOpen ? "true" : "false";
    }

    renderGalleryManager();
  }

  function renderGalleryManager() {
    if (
      !hasRequiredRefs("renderGalleryManager", [
        "galleryManagerSurface",
        "galleryCaption",
        "galleryUploadButton",
        "galleryRefreshButton",
        "galleryUploadInput",
        "galleryEmptyState",
        "galleryGrid"
      ])
    ) {
      return;
    }

    const canManageGallery = isSuperAdmin();
    refs.galleryManagerSurface.hidden = !canManageGallery;

    if (!canManageGallery) {
      return;
    }

    refs.galleryUploadButton.disabled = state.uploadingGallery;
    refs.galleryRefreshButton.disabled = state.uploadingGallery || state.pendingGalleryPaths.size > 0;
    refs.galleryUploadInput.disabled = state.uploadingGallery;
    refs.galleryCaption.textContent = `Public homepage gallery images currently in ${GALLERY_BUCKET}: ${state.galleryAssets.length}`;

    refs.galleryGrid.textContent = "";

    if (!state.galleryAssets.length) {
      refs.galleryEmptyState.hidden = false;
      return;
    }

    refs.galleryEmptyState.hidden = true;
    const fragment = document.createDocumentFragment();

    state.galleryAssets.forEach((asset) => {
      const card = document.createElement("article");
      card.className = "admin-gallery-card";

      const preview = document.createElement("div");
      preview.className = "admin-gallery-preview";
      const image = document.createElement("img");
      image.src = asset.src;
      image.alt = asset.path;
      image.loading = "lazy";
      preview.append(image);

      const body = document.createElement("div");
      body.className = "admin-gallery-body";

      const title = document.createElement("p");
      title.className = "admin-gallery-title";
      title.textContent = asset.path;

      const meta = document.createElement("div");
      meta.className = "admin-gallery-meta";

      const sizeLine = document.createElement("span");
      sizeLine.textContent = `Size: ${formatBytes(asset.size)}`;
      meta.append(sizeLine);

      const updatedLine = document.createElement("span");
      updatedLine.textContent = asset.updatedAt
        ? `Updated: ${formatDateTime(asset.updatedAt)}`
        : "Updated: --";
      meta.append(updatedLine);

      const actions = document.createElement("div");
      actions.className = "admin-gallery-actions";

      const openButton = document.createElement("a");
      openButton.className = "admin-button admin-button--secondary";
      openButton.href = asset.src;
      openButton.target = "_blank";
      openButton.rel = "noreferrer";
      openButton.textContent = "Open";

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "admin-button admin-button--danger";
      deleteButton.dataset.galleryAction = "delete-gallery";
      deleteButton.dataset.galleryPath = asset.path;
      deleteButton.disabled = state.pendingGalleryPaths.has(asset.path) || state.uploadingGallery;
      deleteButton.textContent = state.pendingGalleryPaths.has(asset.path) ? "Deleting..." : "Delete";

      actions.append(openButton, deleteButton);
      body.append(title, meta, actions);
      card.append(preview, body);
      fragment.append(card);
    });

    refs.galleryGrid.append(fragment);
  }

  async function handleApproveAction(bookingId) {
    const booking = state.bookings.get(bookingId);

    if (!booking) {
      return;
    }

    const hasConflict = hasConfirmedConflict(booking.eventDate, booking.id);

    if (hasConflict && isSuperAdmin()) {
      openConfirmModal({
        eyebrow: "Booking Conflict",
        title: "Override existing confirmation?",
        copy:
          "A different booking is already confirmed for this date. Continuing will cancel the currently confirmed record and confirm this request instead.",
        warning: "Only the super admin can perform this override.",
        actionLabel: "Override and Confirm",
        actionTone: "danger",
        onAccept: async () => {
          await saveBooking({
            bookingId,
            customerName: booking.customerName,
            customerEmail: booking.customerEmail,
            eventDate: booking.eventDate,
            guestCount: booking.guestCount,
            status: "confirmed",
            overrideConflict: true,
            successMessage: "Booking confirmed and conflicting date released."
          });
        }
      });
      return;
    }

    if (hasConflict) {
      showToast("Another booking is already confirmed for this date.", "error");
      return;
    }

    await saveBooking({
      bookingId,
      status: "confirmed",
      successMessage: "Booking confirmed successfully."
    });
  }

  async function saveBooking({
    bookingId,
    customerName = null,
    customerEmail = null,
    eventDate = null,
    guestCount = null,
    status = null,
    overrideConflict = false,
    successMessage = "Booking updated successfully."
  }) {
    const booking = state.bookings.get(bookingId);

    if (!booking || state.pendingBookingIds.has(bookingId)) {
      return false;
    }

    state.pendingBookingIds.add(bookingId);
    state.modal.busy = true;
    setBookingFormStatus("Saving changes...");
    renderTable();
    renderDashboard();

    try {
      const payload = {
        p_booking_id: bookingId,
        p_customer_name: customerName === null ? booking.customerName : customerName,
        p_customer_email: customerEmail === null ? booking.customerEmail : customerEmail,
        p_event_date: eventDate === null ? booking.eventDate : eventDate,
        p_guest_count: guestCount === null ? booking.guestCount : guestCount,
        p_status: status === null ? booking.status : status,
        p_override_conflict: Boolean(overrideConflict)
      };

      let updatedBooking = null;
      let usedDirectFallback = false;
      const { data, error } = await state.client.rpc("admin_save_booking", payload);

      if (error) {
        if (!isMissingAdminSaveBookingRpcError(error)) {
          throw error;
        }

        usedDirectFallback = true;
        updatedBooking = await saveBookingWithoutRpc({
          bookingId,
          customerName: payload.p_customer_name,
          customerEmail: payload.p_customer_email,
          eventDate: payload.p_event_date,
          guestCount: payload.p_guest_count,
          status: payload.p_status,
          overrideConflict: payload.p_override_conflict
        });
      } else {
        updatedBooking = normalizeBooking(Array.isArray(data) ? data[0] : data);
      }

      if (updatedBooking.id) {
        if (overrideConflict && updatedBooking.status === "confirmed") {
          state.bookings.forEach((candidate, candidateId) => {
            if (
              candidateId !== updatedBooking.id &&
              candidate.eventDate === updatedBooking.eventDate &&
              candidate.status === "confirmed"
            ) {
              state.bookings.set(candidateId, {
                ...candidate,
                status: "cancelled"
              });
            }
          });
        }

        state.bookings.set(updatedBooking.id, updatedBooking);
      }

      touchSync();
      renderTable();
      renderDashboard();
      renderSettings();
      state.modal.busy = false;
      closeModal(true);
      if (usedDirectFallback) {
        console.warn("[diamond-admin] Falling back to direct bookings update because admin_save_booking is unavailable.");
      }
      showToast(successMessage, "success");
      return true;
    } catch (error) {
      console.error("[diamond-admin] Unable to save booking.", error);
      const message = describeError(error, "Unable to update booking.");
      setBookingFormStatus(message, "error");
      showToast(message, "error");
      syncBookingOverrideAvailability();
      return false;
    } finally {
      state.pendingBookingIds.delete(bookingId);
      state.modal.busy = false;
      renderTable();
      renderDashboard();
    }
  }

  async function saveBookingWithoutRpc({
    bookingId,
    customerName,
    customerEmail,
    eventDate,
    guestCount,
    status,
    overrideConflict
  }) {
    if (status === "confirmed" && overrideConflict) {
      const conflictingBooking = Array.from(state.bookings.values()).find((candidate) => {
        return candidate.id !== bookingId && candidate.eventDate === eventDate && candidate.status === "confirmed";
      });

      if (conflictingBooking?.id) {
        const { error: conflictError } = await state.client
          .from("bookings")
          .update({ status: "cancelled" })
          .eq("id", conflictingBooking.id);

        if (conflictError) {
          throw conflictError;
        }
      }
    }

    const { data, error } = await state.client
      .from("bookings")
      .update({
        customer_name: customerName,
        customer_email: customerEmail || null,
        event_date: eventDate,
        guest_count: guestCount,
        status
      })
      .eq("id", bookingId)
      .select("id, customer_name, customer_email, event_date, guest_count, status, created_at")
      .single();

    if (error) {
      throw error;
    }

    return normalizeBooking(data);
  }

  async function deleteBooking(bookingId) {
    if (!isSuperAdmin() || state.pendingBookingIds.has(bookingId)) {
      return;
    }

    state.pendingBookingIds.add(bookingId);
    state.modal.busy = true;
    renderTable();

    try {
      const { error } = await state.client.from("bookings").delete().eq("id", bookingId);

      if (error) {
        throw error;
      }

      state.bookings.delete(bookingId);
      touchSync();
      renderTable();
      renderDashboard();
      renderSettings();
      closeModal(true);
      showToast("Booking deleted successfully.", "success");
    } catch (error) {
      console.error("[diamond-admin] Unable to delete booking.", error);
      showToast(describeError(error, "Unable to delete booking."), "error");
    } finally {
      state.pendingBookingIds.delete(bookingId);
      state.modal.busy = false;
      renderTable();
    }
  }

  async function updateEnquiryStatus(enquiryId, nextStatus) {
    if (!isSuperAdmin() || !ENQUIRY_STATUSES.has(nextStatus) || state.pendingEnquiryIds.has(enquiryId)) {
      return;
    }

    state.pendingEnquiryIds.add(enquiryId);
    renderDashboard();

    try {
      const { data, error } = await state.client
        .from("enquiries")
        .update({ status: nextStatus })
        .eq("id", enquiryId)
        .select("id, customer_name, customer_phone, event_date, message, status, created_at")
        .single();

      if (error) {
        throw error;
      }

      const updatedEnquiry = normalizeEnquiry(data);
      state.enquiries.set(updatedEnquiry.id, updatedEnquiry);
      touchSync();
      renderDashboard();
      renderSettings();
      showToast(`Enquiry marked as ${formatStatus(nextStatus)}.`, "success");
    } catch (error) {
      console.error("[diamond-admin] Unable to update enquiry.", error);
      showToast(describeError(error, "Unable to update enquiry."), "error");
    } finally {
      state.pendingEnquiryIds.delete(enquiryId);
      renderDashboard();
    }
  }

  async function deleteEnquiry(enquiryId) {
    if (!isSuperAdmin() || state.pendingEnquiryIds.has(enquiryId)) {
      return;
    }

    state.pendingEnquiryIds.add(enquiryId);
    state.modal.busy = true;
    renderDashboard();

    try {
      const { error } = await state.client.from("enquiries").delete().eq("id", enquiryId);

      if (error) {
        throw error;
      }

      state.enquiries.delete(enquiryId);
      touchSync();
      renderDashboard();
      renderSettings();
      closeModal(true);
      showToast("Enquiry deleted successfully.", "success");
    } catch (error) {
      console.error("[diamond-admin] Unable to delete enquiry.", error);
      showToast(describeError(error, "Unable to delete enquiry."), "error");
    } finally {
      state.pendingEnquiryIds.delete(enquiryId);
      state.modal.busy = false;
      renderDashboard();
    }
  }

  async function savePricingSettings() {
    if (!state.client || state.savingPricing) {
      return;
    }

    const hallPrice = parsePositiveInteger(refs.pricingHallPrice.value);
    const roomPrice = parsePositiveInteger(refs.pricingRoomPrice.value);
    const roomCount = parseNonNegativeInteger(refs.pricingRoomCount.value);

    if (hallPrice === null || roomPrice === null || roomCount === null) {
      setStatus(refs.pricingStatus, "Enter valid pricing values before saving.", "error");
      return;
    }

    state.savingPricing = true;
    refs.pricingSaveButton.disabled = true;
    setStatus(refs.pricingStatus, "Saving pricing...");

    try {
      const payload = {
        hall_price: hallPrice,
        room_price: roomPrice,
        hall_price_4hrs: hallPrice,
        room_price_night: roomPrice,
        room_count: roomCount
      };

      const { data, error } = await state.client
        .from("site_settings")
        .update(payload)
        .eq("id", 1)
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      state.siteSettings = normalizeSiteSettingsRow(data);
      touchSync();
      renderSettings();
      setStatus(refs.pricingStatus, "Pricing updated successfully.", "success");
      showToast("Pricing updated successfully.", "success");
    } catch (error) {
      console.error("[diamond-admin] Unable to save pricing.", error);
      const message = describeError(error, "Unable to save pricing.");
      setStatus(refs.pricingStatus, message, "error");
      showToast(message, "error");
    } finally {
      state.savingPricing = false;
      refs.pricingSaveButton.disabled = false;
    }
  }

  async function saveSiteProfile() {
    if (!isSuperAdmin() || !state.client || state.savingProfile) {
      return;
    }

    const hallName = normalizeText(refs.profileHallName.value);
    const contactNumber = normalizePhoneDigits(refs.profileContactNumber.value, false);
    const whatsappNumber = normalizePhoneDigits(refs.profileWhatsappNumber.value, true);
    const googleMapsLink = normalizeUrlOrEmpty(refs.profileGoogleMapsLink.value);

    if (!hallName) {
      setStatus(refs.siteProfileStatus, "Hall name is required.", "error");
      return;
    }

    if (!contactNumber) {
      setStatus(refs.siteProfileStatus, "Contact number is required.", "error");
      return;
    }

    if (refs.profileGoogleMapsLink.value && !googleMapsLink) {
      setStatus(refs.siteProfileStatus, "Enter a valid Google Maps URL.", "error");
      return;
    }

    state.savingProfile = true;
    refs.siteProfileSaveButton.disabled = true;
    setStatus(refs.siteProfileStatus, "Saving venue controls...");

    try {
      const payload = {
        hall_name: hallName,
        contact_number: contactNumber,
        whatsapp_number: whatsappNumber,
        instagram_handle: normalizeText(refs.profileInstagramHandle.value),
        google_maps_link: googleMapsLink || null,
        location_label: normalizeText(refs.profileLocationLabel.value),
        map_label: normalizeText(refs.profileMapLabel.value),
        address_line_1: normalizeText(refs.profileAddressLine1.value),
        address_line_2: normalizeText(refs.profileAddressLine2.value),
        inquiry_hours: normalizeText(refs.profileInquiryHours.value),
        is_hall_open: refs.profileHallOpen.value === "true"
      };

      const { data, error } = await state.client
        .from("site_settings")
        .update(payload)
        .eq("id", 1)
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      state.siteSettings = normalizeSiteSettingsRow(data);
      touchSync();
      renderSettings();
      setStatus(refs.siteProfileStatus, "Venue controls updated successfully.", "success");
      showToast("Venue controls updated successfully.", "success");
    } catch (error) {
      console.error("[diamond-admin] Unable to save venue controls.", error);
      const message = describeError(error, "Unable to save venue controls.");
      setStatus(refs.siteProfileStatus, message, "error");
      showToast(message, "error");
    } finally {
      state.savingProfile = false;
      refs.siteProfileSaveButton.disabled = false;
    }
  }

  async function uploadGalleryAssets() {
    if (!isSuperAdmin() || !state.client || state.uploadingGallery) {
      return;
    }

    const files = Array.from(refs.galleryUploadInput?.files || []).filter((file) => file instanceof File);

    if (!files.length) {
      setStatus(refs.galleryUploadStatus, "Choose at least one image file to upload.", "error");
      return;
    }

    const invalidFile = files.find((file) => {
      const normalizedName = normalizeGalleryFileName(file.name);
      return !normalizedName || !IMAGE_FILE_PATTERN.test(normalizedName);
    });

    if (invalidFile) {
      setStatus(refs.galleryUploadStatus, `Unsupported image file: ${invalidFile.name}`, "error");
      return;
    }

    state.uploadingGallery = true;
    renderGalleryManager();
    setStatus(refs.galleryUploadStatus, `Uploading ${files.length} image${files.length === 1 ? "" : "s"}...`);

    try {
      for (const file of files) {
        const path = normalizeGalleryFileName(file.name);
        const { error } = await state.client.storage.from(GALLERY_BUCKET).upload(path, file, {
          upsert: true,
          contentType: file.type || undefined
        });

        if (error) {
          throw error;
        }
      }

      refs.galleryUploadInput.value = "";
      await fetchGalleryAssets({ silent: true });
      setStatus(refs.galleryUploadStatus, "Gallery images uploaded successfully.", "success");
      showToast("Gallery images uploaded successfully.", "success");
    } catch (error) {
      console.error("[diamond-admin] Unable to upload gallery images.", error);
      const message = describeError(error, "Unable to upload gallery images.");
      setStatus(refs.galleryUploadStatus, message, "error");
      showToast(message, "error");
    } finally {
      state.uploadingGallery = false;
      renderGalleryManager();
    }
  }

  async function deleteGalleryAsset(galleryPath) {
    if (!isSuperAdmin() || !state.client || !galleryPath || state.pendingGalleryPaths.has(galleryPath)) {
      return;
    }

    state.pendingGalleryPaths.add(galleryPath);
    renderGalleryManager();
    setStatus(refs.galleryUploadStatus, `Deleting ${galleryPath}...`);

    try {
      const { error } = await state.client.storage.from(GALLERY_BUCKET).remove([galleryPath]);

      if (error) {
        throw error;
      }

      closeModal(true);
      await fetchGalleryAssets({ silent: true });
      setStatus(refs.galleryUploadStatus, `${galleryPath} deleted successfully.`, "success");
      showToast("Gallery image deleted successfully.", "success");
    } catch (error) {
      console.error("[diamond-admin] Unable to delete gallery image.", error);
      const message = describeError(error, "Unable to delete gallery image.");
      setStatus(refs.galleryUploadStatus, message, "error");
      showToast(message, "error");
    } finally {
      state.pendingGalleryPaths.delete(galleryPath);
      renderGalleryManager();
    }
  }

  async function handleLogout() {
    if (!state.client) {
      window.location.replace("login.html");
      return;
    }

    if (refs.logoutButton) {
      refs.logoutButton.disabled = true;
    }

    try {
      await clearLocalAdminSession();
      window.location.replace("login.html");
    } catch (error) {
      if (refs.logoutButton) {
        refs.logoutButton.disabled = false;
      }
      showToast(describeError(error, "Unable to sign out right now."), "error");
    }
  }

  function subscribeToRealtime() {
    cleanupRealtimeChannel();
    setRealtimeStatus("Connecting...", "Establishing the shared live channel.");

    state.channel = state.client
      .channel("diamond-admin-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, (payload) => {
        handleBookingRealtime(payload);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "site_settings" }, (payload) => {
        handleSettingsRealtime(payload);
      });

    if (isSuperAdmin()) {
      state.channel.on("postgres_changes", { event: "*", schema: "public", table: "enquiries" }, (payload) => {
        handleEnquiryRealtime(payload);
      });
    }

    state.channel.subscribe((status, error) => {
      if (status === "SUBSCRIBED") {
        setRealtimeStatus("Live sync active", "Bookings, enquiries, and settings update instantly.");
        return;
      }

      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        setRealtimeStatus("Realtime unavailable", "Manual refresh is still available.");

        if (error) {
          showToast(describeError(error, "Realtime sync is temporarily unavailable."), "error");
        }

        return;
      }

      if (status === "CLOSED") {
        setRealtimeStatus("Disconnected", "The live channel has closed.");
        return;
      }

      setRealtimeStatus("Connecting...", "Establishing the shared live channel.");
    });
  }

  function handleBookingRealtime(payload) {
    const eventType = String(payload.eventType || "").toUpperCase();

    if (eventType === "DELETE") {
      const deletedId = String(payload.old?.id || "").trim();

      if (deletedId) {
        state.bookings.delete(deletedId);
      }

      touchSync();
      renderTable();
      renderDashboard();
      renderSettings();
      return;
    }

    const booking = normalizeBooking(payload.new);

    if (!booking.id) {
      return;
    }

    state.bookings.set(booking.id, booking);
    touchSync();
    renderTable();
    renderDashboard();
    renderSettings();

    if (eventType === "INSERT" && !state.pendingBookingIds.has(booking.id)) {
      showToast(`New booking request from ${booking.customerName}.`, "success");
    }
  }

  function handleEnquiryRealtime(payload) {
    if (!isSuperAdmin()) {
      return;
    }

    const eventType = String(payload.eventType || "").toUpperCase();

    if (eventType === "DELETE") {
      const deletedId = Number(payload.old?.id);

      if (Number.isFinite(deletedId)) {
        state.enquiries.delete(deletedId);
      }

      touchSync();
      renderDashboard();
      renderSettings();
      return;
    }

    const enquiry = normalizeEnquiry(payload.new);

    if (!Number.isFinite(enquiry.id)) {
      return;
    }

    state.enquiries.set(enquiry.id, enquiry);
    touchSync();
    renderDashboard();
    renderSettings();

    if (eventType === "INSERT" && !state.pendingEnquiryIds.has(enquiry.id)) {
      showToast(`New enquiry from ${enquiry.customerName}.`, "success");
    }
  }

  function handleSettingsRealtime(payload) {
    const row = payload.new || payload.old;

    if (!row || Number(row.id) !== 1) {
      return;
    }

    if (payload.eventType === "DELETE") {
      return;
    }

    state.siteSettings = normalizeSiteSettingsRow(payload.new);
    touchSync();
    renderSettings();
  }

  function cleanupRealtimeChannel() {
    if (!state.client || !state.channel) {
      state.channel = null;
      return;
    }

    void state.client.removeChannel(state.channel);
    state.channel = null;
  }

  function openBookingModal(bookingId) {
    const booking = state.bookings.get(bookingId);

    if (!booking) {
      return;
    }

    if (
      !hasRequiredRefs("openBookingModal", [
        "modalLayer",
        "modalEyebrow",
        "modalTitle",
        "modalCopy",
        "bookingForm",
        "bookingFormStatus",
        "confirmPanel",
        "bookingModalName",
        "bookingModalEmail",
        "bookingModalDate",
        "bookingModalGuests",
        "bookingModalStatus",
        "bookingOverrideCheckbox",
        "bookingOverrideRow",
        "bookingModalNameField",
        "bookingModalEmailField",
        "confirmAccept"
      ])
    ) {
      return;
    }

    state.modal.type = "booking";
    state.modal.targetId = bookingId;
    state.modal.onAccept = null;
    state.modal.busy = false;
    refs.modalEyebrow.textContent = "Booking";
    refs.modalTitle.textContent = "Edit booking";
    refs.modalCopy.textContent = "Update the booking details and save them to the live system.";
    refs.bookingForm.hidden = false;
    refs.bookingForm.removeAttribute("hidden");
    refs.confirmPanel.hidden = true;
    refs.bookingFormStatus.textContent = "";
    refs.bookingModalName.value = booking.customerName;
    refs.bookingModalEmail.value = booking.customerEmail;
    refs.bookingModalDate.value = booking.eventDate;
    refs.bookingModalGuests.value = booking.guestCount ? String(booking.guestCount) : "";
    refs.bookingModalStatus.value = booking.status;
    refs.bookingOverrideCheckbox.checked = false;
    refs.bookingOverrideRow.hidden = true;
    refs.bookingModalName.readOnly = !isSuperAdmin();
    refs.bookingModalEmail.readOnly = !isSuperAdmin();
    refs.bookingModalNameField.hidden = false;
    refs.bookingModalEmailField.hidden = false;
    refs.confirmAccept.textContent = "Confirm";
    refs.confirmAccept.classList.remove("admin-button--primary");
    refs.confirmAccept.classList.add("admin-button--danger");
    refs.modalLayer.hidden = false;
    refs.modalLayer.removeAttribute("hidden");
    syncBookingOverrideAvailability();

    window.setTimeout(() => {
      if (isSuperAdmin()) {
        refs.bookingModalName?.focus();
      } else {
        refs.bookingModalDate?.focus();
      }
    }, 0);
  }

  function openDeleteBookingConfirm(bookingId) {
    const booking = state.bookings.get(bookingId);

    if (!booking || !isSuperAdmin()) {
      return;
    }

    openConfirmModal({
      eyebrow: "Delete Booking",
      title: "Delete this booking record?",
      copy: `${booking.customerName} on ${formatDate(booking.eventDate)} will be removed from the live system.`,
      warning: "This deletes the booking and its compatibility mirror row.",
      actionLabel: "Delete Booking",
      actionTone: "danger",
      onAccept: async () => {
        await deleteBooking(bookingId);
      }
    });
  }

  function openDeleteEnquiryConfirm(enquiryId) {
    const enquiry = state.enquiries.get(enquiryId);

    if (!enquiry || !isSuperAdmin()) {
      return;
    }

    openConfirmModal({
      eyebrow: "Delete Enquiry",
      title: "Delete this enquiry?",
      copy: `${enquiry.customerName}'s enquiry will be permanently removed.`,
      warning: "This action cannot be undone.",
      actionLabel: "Delete Enquiry",
      actionTone: "danger",
      onAccept: async () => {
        await deleteEnquiry(enquiryId);
      }
    });
  }

  function openDeleteGalleryAssetConfirm(galleryPath) {
    if (!isSuperAdmin()) {
      return;
    }

    openConfirmModal({
      eyebrow: "Delete Gallery Image",
      title: "Delete this gallery image?",
      copy: `${galleryPath} will be removed from the public gallery bucket.`,
      warning: "This action cannot be undone.",
      actionLabel: "Delete Image",
      actionTone: "danger",
      onAccept: async () => {
        await deleteGalleryAsset(galleryPath);
      }
    });
  }

  function openConfirmModal({ eyebrow, title, copy, warning, actionLabel, actionTone, onAccept }) {
    if (
      !hasRequiredRefs("openConfirmModal", [
        "modalLayer",
        "modalEyebrow",
        "modalTitle",
        "modalCopy",
        "confirmWarning",
        "confirmAccept",
        "bookingForm",
        "confirmPanel"
      ])
    ) {
      return;
    }

    state.modal.type = "confirm";
    state.modal.targetId = null;
    state.modal.onAccept = onAccept;
    state.modal.busy = false;
    refs.modalEyebrow.textContent = eyebrow;
    refs.modalTitle.textContent = title;
    refs.modalCopy.textContent = copy;
    refs.confirmWarning.textContent = warning;
    refs.confirmAccept.textContent = actionLabel;
    refs.confirmAccept.classList.toggle("admin-button--danger", actionTone === "danger");
    refs.confirmAccept.classList.toggle("admin-button--primary", actionTone !== "danger");
    refs.bookingForm.hidden = true;
    refs.confirmPanel.hidden = false;
    refs.modalLayer.hidden = false;
    refs.modalLayer.removeAttribute("hidden");

    window.setTimeout(() => {
      refs.confirmAccept?.focus();
    }, 0);
  }

  async function handleConfirmAccept() {
    if (!hasRequiredRefs("handleConfirmAccept", ["confirmAccept", "confirmCancel"])) {
      return;
    }

    if (state.modal.busy || typeof state.modal.onAccept !== "function") {
      return;
    }

    state.modal.busy = true;
    refs.confirmAccept.disabled = true;
    refs.confirmCancel.disabled = true;

    try {
      await state.modal.onAccept();
    } finally {
      refs.confirmAccept.disabled = false;
      refs.confirmCancel.disabled = false;

      if (state.modal.type === "confirm") {
        state.modal.busy = false;
      }
    }
  }

  function closeModal(force) {
    if (state.modal.busy && force !== true) {
      return;
    }

    state.modal.type = null;
    state.modal.targetId = null;
    state.modal.onAccept = null;
    state.modal.busy = false;

    if (
      !hasRequiredRefs("closeModal", [
        "modalLayer",
        "bookingForm",
        "confirmPanel",
        "bookingFormStatus",
        "bookingOverrideCheckbox",
        "bookingOverrideRow",
        "confirmAccept",
        "confirmCancel"
      ])
    ) {
      return;
    }

    refs.modalLayer.hidden = true;
    refs.bookingForm.hidden = true;
    refs.confirmPanel.hidden = true;
    refs.bookingFormStatus.textContent = "";
    refs.bookingOverrideCheckbox.checked = false;
    refs.bookingOverrideRow.hidden = true;
    refs.confirmAccept.disabled = false;
    refs.confirmCancel.disabled = false;
  }

  async function handleBookingFormSubmit() {
    if (
      !hasRequiredRefs("handleBookingFormSubmit", [
        "bookingModalDate",
        "bookingModalGuests",
        "bookingModalStatus",
        "bookingModalName",
        "bookingModalEmail",
        "bookingOverrideCheckbox",
        "bookingOverrideRow"
      ])
    ) {
      return;
    }

    const bookingId = state.modal.targetId;
    const booking = state.bookings.get(bookingId);

    if (!booking) {
      return;
    }

    const eventDate = normalizeDateValue(refs.bookingModalDate.value);
    const guestCount = parsePositiveInteger(refs.bookingModalGuests.value, true);
    const status = String(refs.bookingModalStatus.value || "").trim().toLowerCase();
    const customerName = normalizeText(refs.bookingModalName.value) || booking.customerName;
    const customerEmail = normalizeEmail(refs.bookingModalEmail.value) || "";
    const overrideConflict = refs.bookingOverrideCheckbox.checked && !refs.bookingOverrideRow.hidden;

    if (!eventDate) {
      setBookingFormStatus("Choose a valid event date.", "error");
      return;
    }

    if (!VALID_STATUSES.has(status)) {
      setBookingFormStatus("Choose a valid booking status.", "error");
      return;
    }

    if (guestCount === null) {
      setBookingFormStatus("Guest count must be at least 1.", "error");
      return;
    }

    if (isSuperAdmin() && customerEmail) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(customerEmail)) {
        setBookingFormStatus("Enter a valid email address.", "error");
        return;
      }
    }

    await saveBooking({
      bookingId,
      customerName,
      customerEmail,
      eventDate,
      guestCount,
      status,
      overrideConflict,
      successMessage: "Booking updated successfully."
    });
  }

  function syncBookingOverrideAvailability() {
    if (
      !hasRequiredRefs("syncBookingOverrideAvailability", [
        "bookingModalStatus",
        "bookingModalDate",
        "bookingOverrideRow",
        "bookingOverrideCheckbox"
      ])
    ) {
      return;
    }

    if (state.modal.type !== "booking") {
      return;
    }

    const bookingId = state.modal.targetId;
    const status = String(refs.bookingModalStatus.value || "").trim().toLowerCase();
    const eventDate = normalizeDateValue(refs.bookingModalDate.value);
    const showOverride =
      isSuperAdmin() && status === "confirmed" && Boolean(eventDate) && hasConfirmedConflict(eventDate, bookingId);

    refs.bookingOverrideRow.hidden = !showOverride;

    if (!showOverride) {
      refs.bookingOverrideCheckbox.checked = false;
    }
  }

  function clearFilters() {
    window.clearTimeout(state.searchTimer);
    state.filters.search = "";
    state.filters.status = "all";
    state.filters.specificDate = "";
    state.filters.startDate = "";
    state.filters.endDate = "";
    refs.searchInput.value = "";
    refs.statusFilter.value = "all";
    refs.specificDateFilter.value = "";
    refs.startDateFilter.value = "";
    refs.endDateFilter.value = "";
    renderTable();
  }

  function setActiveView(viewName) {
    if (!hasRequiredRefs("setActiveView", ["headerEyebrow", "pageTitle", "pageSubtitle"])) {
      return;
    }

    const nextView = VIEW_CONFIG[viewName] ? viewName : "bookings";

    state.activeView = nextView;
    refs.navButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.view === nextView);
    });

    Object.entries(refs.views).forEach(([name, element]) => {
      if (!element) {
        console.error(`[diamond-admin] setActiveView missing required element: ${name}`);
        return;
      }

      const isActive = name === nextView;
      element.hidden = !isActive;
      element.classList.toggle("is-active", isActive);
    });

    refs.headerEyebrow.textContent = VIEW_CONFIG[nextView].title;
    refs.pageTitle.textContent = VIEW_CONFIG[nextView].title;
    refs.pageSubtitle.textContent = VIEW_CONFIG[nextView].subtitle;
  }

  function syncIdentity() {
    if (!hasRequiredRefs("syncIdentity", ["userEmail", "userRole", "settingsSessionEmail", "settingsSessionRole"])) {
      return;
    }

    refs.userEmail.textContent = state.admin?.email || "--";
    refs.userRole.textContent = formatRole(state.admin?.role || "");
    refs.settingsSessionEmail.textContent = state.admin?.email || "--";
    refs.settingsSessionRole.textContent = formatRole(state.admin?.role || "");
  }

  function getSortedBookings() {
    return Array.from(state.bookings.values()).sort(compareBookings);
  }

  function getFilteredBookings(bookings) {
    const normalizedSearch = state.filters.search;
    const normalizedStatus = state.filters.status;
    const specificDate = state.filters.specificDate;
    const startDate = state.filters.startDate;
    const endDate = state.filters.endDate;

    return bookings.filter((booking) => {
      if (normalizedStatus !== "all" && booking.status !== normalizedStatus) {
        return false;
      }

      if (specificDate && booking.eventDate !== specificDate) {
        return false;
      }

      if (startDate && booking.eventDate < startDate) {
        return false;
      }

      if (endDate && booking.eventDate > endDate) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const haystack = `${booking.customerName} ${booking.customerEmail}`.toLowerCase();
      return haystack.includes(normalizedSearch);
    });
  }

  function getSortedEnquiries() {
    return Array.from(state.enquiries.values()).sort((left, right) => {
      return new Date(right.createdAt || 0).getTime() - new Date(left.createdAt || 0).getTime();
    });
  }

  function hasConfirmedConflict(eventDate, bookingId) {
    return Array.from(state.bookings.values()).some((booking) => {
      return booking.eventDate === eventDate && booking.status === "confirmed" && booking.id !== bookingId;
    });
  }

  function touchSync() {
    state.lastSyncAt = new Date();

    if (refs.settingsLastSync) {
      refs.settingsLastSync.textContent = formatDateTime(state.lastSyncAt);
    }
  }

  function setRealtimeStatus(status, note) {
    state.realtimeStatus = status;
    state.realtimeNote = note;

    if (refs.sidebarSyncStatus) {
      refs.sidebarSyncStatus.textContent = status;
    }

    if (refs.sidebarSyncNote) {
      refs.sidebarSyncNote.textContent = note;
    }

    if (refs.settingsRealtimeStatus) {
      refs.settingsRealtimeStatus.textContent = status;
    }
  }

  function setLoadingState(message, showRetry = false) {
    if (refs.loadingOverlay) {
      refs.loadingOverlay.classList.remove("is-hidden");
    }

    if (refs.loadingText) {
      refs.loadingText.textContent = message;
    }

    if (refs.loadingActions) {
      refs.loadingActions.hidden = !showRetry;
    }
  }

  function hideLoadingState() {
    if (refs.loadingOverlay) {
      refs.loadingOverlay.classList.add("is-hidden");
    }

    if (refs.loadingActions) {
      refs.loadingActions.hidden = true;
    }
  }

  function setBookingFormStatus(message, tone = "default") {
    setStatus(refs.bookingFormStatus, message, tone);
  }

  function setStatus(element, message, tone = "default") {
    if (!element) {
      return;
    }

    element.textContent = message || "";
    element.dataset.tone = tone;
  }

  function showToast(message, tone = "default") {
    if (!message || !refs.toastStack) {
      return;
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.dataset.tone = tone;
    toast.textContent = message;
    refs.toastStack.append(toast);

    requestAnimationFrame(() => {
      toast.classList.add("is-visible");
    });

    window.setTimeout(() => {
      toast.classList.remove("is-visible");
      window.setTimeout(() => {
        toast.remove();
      }, 240);
    }, 3600);
  }

  function buildCell(label, content) {
    const cell = document.createElement("td");
    cell.dataset.label = label;

    if (content instanceof Node) {
      cell.append(content);
    } else {
      cell.textContent = content;
    }

    return cell;
  }

  function buildNameCell(primaryText, secondaryText) {
    const wrapper = document.createElement("div");
    wrapper.className = "admin-cell-name";

    const title = document.createElement("strong");
    title.textContent = primaryText || "Unknown customer";

    const meta = document.createElement("span");
    meta.className = "admin-cell-meta";
    meta.textContent = secondaryText || "";

    wrapper.append(title, meta);
    return wrapper;
  }

  function buildStatusBadge(status) {
    const badge = document.createElement("span");
    badge.className = "admin-status-badge";
    badge.dataset.status = status;
    badge.textContent = formatStatus(status);
    return badge;
  }

  function buildBookingActionsCell({ booking, isBusy, hasConflict }) {
    const wrapper = document.createElement("div");
    wrapper.className = "admin-row-actions";

    const approveButton = buildActionButton(
      hasConflict && isSuperAdmin() ? "Override" : "Approve",
      "approve",
      booking.id,
      "primary"
    );
    const cancelButton = buildActionButton("Cancel", "cancel", booking.id, "secondary");
    const editButton = buildActionButton("Edit", "edit", booking.id, "secondary");

    approveButton.disabled = isBusy || booking.status === "confirmed" || (hasConflict && !isSuperAdmin());
    cancelButton.disabled = isBusy || booking.status === "cancelled";
    editButton.disabled = isBusy;

    if (hasConflict && !isSuperAdmin()) {
      approveButton.title = "Another booking is already confirmed for this date.";
    }

    if (hasConflict && isSuperAdmin()) {
      approveButton.title = "Override the current confirmed booking for this date.";
    }

    wrapper.append(approveButton, cancelButton, editButton);

    if (isSuperAdmin()) {
      const deleteButton = buildActionButton("Delete", "delete", booking.id, "danger");
      deleteButton.disabled = isBusy;
      wrapper.append(deleteButton);
    }

    return wrapper;
  }

  function buildEnquiryActionsCell(enquiry, isBusy) {
    const wrapper = document.createElement("div");
    wrapper.className = "admin-row-actions";

    [
      { label: "Contacted", action: "contacted", tone: "secondary" },
      { label: "Booked", action: "booked", tone: "primary" },
      { label: "Cancel", action: "cancelled", tone: "secondary" }
    ].forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `admin-button admin-button--${item.tone}`;
      button.dataset.action = item.action;
      button.dataset.enquiryId = String(enquiry.id);
      button.textContent = item.label;
      button.disabled = isBusy || enquiry.status === item.action;
      wrapper.append(button);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "admin-button admin-button--danger";
    deleteButton.dataset.action = "delete-enquiry";
    deleteButton.dataset.enquiryId = String(enquiry.id);
    deleteButton.textContent = "Delete";
    deleteButton.disabled = isBusy;
    wrapper.append(deleteButton);

    return wrapper;
  }

  function buildActionButton(label, action, bookingId, tone) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `admin-button admin-button--${tone}`;
    button.dataset.action = action;
    button.dataset.bookingId = bookingId;
    button.textContent = label;
    return button;
  }

  function normalizeBooking(row) {
    return {
      id: String(row?.id || "").trim(),
      customerName: normalizeText(row?.customer_name) || "Unknown customer",
      customerEmail: normalizeEmail(row?.customer_email),
      eventDate: normalizeDateValue(row?.event_date),
      guestCount: parsePositiveInteger(row?.guest_count, true),
      status: normalizeStatus(row?.status),
      createdAt: row?.created_at ? new Date(row.created_at) : new Date()
    };
  }

  function normalizeEnquiry(row) {
    return {
      id: Number(row?.id),
      customerName: normalizeText(row?.customer_name) || "Unknown customer",
      customerPhone: formatPhone(row?.customer_phone),
      eventDate: normalizeDateValue(row?.event_date),
      message: normalizeText(row?.message),
      status: normalizeEnquiryStatus(row?.status),
      createdAt: row?.created_at || new Date().toISOString()
    };
  }

  function normalizeSiteSettingsRow(row) {
    return {
      hallName: normalizeText(row?.hall_name) || "Diamond Banquet Hall",
      contactNumber: normalizeText(row?.contact_number) || "9947681202",
      whatsappNumber: normalizeText(row?.whatsapp_number) || "919947681202",
      instagramHandle: normalizeText(row?.instagram_handle) || "@diamondhallallapra",
      googleMapsLink: normalizeText(row?.google_maps_link) || "",
      hallPrice: parsePositiveInteger(row?.hall_price_4hrs ?? row?.hall_price, true) || 30000,
      roomPrice: parsePositiveInteger(row?.room_price_night ?? row?.room_price, true) || 1500,
      roomCount: parseNonNegativeInteger(row?.room_count) ?? 4,
      locationLabel: normalizeText(row?.location_label) || "Allapra, Perumbavoor",
      addressLine1: normalizeText(row?.address_line_1) || "",
      addressLine2: normalizeText(row?.address_line_2) || "",
      mapLabel: normalizeText(row?.map_label) || "",
      inquiryHours: normalizeText(row?.inquiry_hours) || "",
      hallStatusOpen: row?.is_hall_open !== false
    };
  }

  function normalizeAdminRole(value) {
    const normalized = String(value || "").trim().toLowerCase();

    if (normalized === "owner" || normalized === "admin" || normalized === "super_admin") {
      return "super_admin";
    }

    if (normalized === "staff" || normalized === "staff_admin") {
      return "staff_admin";
    }

    return "staff_admin";
  }

  function normalizeStatus(value) {
    const normalized = String(value || "").trim().toLowerCase();
    return VALID_STATUSES.has(normalized) ? normalized : "pending";
  }

  function isMissingAdminSaveBookingRpcError(error) {
    const message = String(error?.message || "").toLowerCase();
    const details = String(error?.details || "").toLowerCase();
    const hint = String(error?.hint || "").toLowerCase();

    return (
      error?.code === "PGRST202" &&
      /admin_save_booking/.test(`${message} ${details} ${hint}`)
    );
  }

  function normalizeEnquiryStatus(value) {
    const normalized = String(value || "").trim().toLowerCase();
    return ENQUIRY_STATUSES.has(normalized) ? normalized : "new";
  }

  function normalizeText(value) {
    return String(value ?? "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeGalleryFileName(value) {
    return String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9._-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function normalizeEmail(value) {
    return normalizeText(value).toLowerCase();
  }

  function normalizeDateValue(value) {
    const normalized = String(value || "").trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : "";
  }

  function normalizePhoneDigits(value, allowEmpty) {
    const digits = String(value ?? "").replace(/\D/g, "");

    if (!digits) {
      return allowEmpty ? "" : "";
    }

    if (digits.length === 10) {
      return digits;
    }

    if (digits.length === 12 && digits.startsWith("91")) {
      return digits;
    }

    return "";
  }

  function normalizeUrlOrEmpty(value) {
    const normalized = normalizeText(value);

    if (!normalized) {
      return "";
    }

    try {
      const parsed = new URL(normalized);
      return /^https?:$/.test(parsed.protocol) ? parsed.toString() : "";
    } catch (_error) {
      return "";
    }
  }

  function parsePositiveInteger(value, allowNull = false) {
    if (value === null || value === undefined || value === "") {
      return allowNull ? null : null;
    }

    const parsed = Number.parseInt(String(value).trim(), 10);
    return Number.isInteger(parsed) && parsed >= 1 ? parsed : null;
  }

  function parseNonNegativeInteger(value) {
    const parsed = Number.parseInt(String(value ?? "").trim(), 10);
    return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
  }

  function compareBookings(left, right) {
    if (left.eventDate !== right.eventDate) {
      return left.eventDate.localeCompare(right.eventDate);
    }

    return right.createdAt.getTime() - left.createdAt.getTime();
  }

  function countStatuses(bookings) {
    return bookings.reduce(
      (totals, booking) => {
        totals.total += 1;
        totals[booking.status] += 1;
        return totals;
      },
      {
        total: 0,
        pending: 0,
        confirmed: 0,
        cancelled: 0
      }
    );
  }

  function formatDate(value) {
    if (!value) {
      return "--";
    }

    return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  function formatDateTime(value) {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "--";
    }

    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  function formatBytes(value) {
    const size = Number(value);

    if (!Number.isFinite(size) || size <= 0) {
      return "Unknown";
    }

    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  function formatPhone(value) {
    const digits = String(value ?? "").replace(/\D/g, "");

    if (digits.length === 10) {
      return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
    }

    if (digits.length === 12 && digits.startsWith("91")) {
      return `+${digits.slice(0, 2)} ${digits.slice(2, 7)} ${digits.slice(7)}`;
    }

    return normalizeText(value);
  }

  function formatRole(role) {
    return ROLE_LABELS[normalizeAdminRole(role)] || "Staff Admin";
  }

  function formatStatus(status) {
    const normalized = String(status || "").trim().toLowerCase();

    if (!normalized) {
      return "--";
    }

    return normalized
      .split(/[_\s]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function describeError(error, fallbackMessage) {
    return describeSupabaseError(error, fallbackMessage);
  }

  function isSuperAdmin() {
    return state.admin?.role === "super_admin";
  }

  function compareGalleryPaths(left, right) {
    const leftName = String(left ?? "").toLowerCase();
    const rightName = String(right ?? "").toLowerCase();
    const leftIndex = GALLERY_PRIORITY.indexOf(leftName);
    const rightIndex = GALLERY_PRIORITY.indexOf(rightName);

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
  }
});

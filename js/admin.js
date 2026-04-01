import {
  DEFAULT_SITE_SETTINGS,
  addReview,
  deleteEnquiry,
  deleteReview,
  describeSupabaseError,
  fetchBookedDates,
  fetchEnquiries,
  fetchReviews,
  fetchSiteSettings,
  getCurrentSession,
  saveSiteSettings,
  subscribeToVenueUpdates,
  updateEnquiryStatus,
  upsertBookingStatus
} from "./site-data.js";
import { supabaseClient } from "./supabase-client.js";

const ROLE_BY_EMAIL = {
  "judah@diamond.com": "judah",
  "empl@diamond.com": "empl"
};

const HALL_STATUS_FIELDS = [
  { column: "hall_status", type: "text" },
  { column: "venue_status", type: "text" },
  { column: "is_hall_open", type: "boolean" }
];

document.addEventListener("DOMContentLoaded", () => {
  const adminShell = document.getElementById("admin-shell");
  const adminBoot = document.getElementById("admin-boot");
  const adminBootStatus = document.getElementById("admin-boot-status");
  const adminBootRetry = document.getElementById("admin-boot-retry");
  const adminDashboard = document.getElementById("admin-dashboard");
  const adminUserEmail = document.getElementById("admin-user-email");
  const adminUserRole = document.getElementById("admin-user-role");
  const adminLogout = document.getElementById("admin-logout");
  const adminBanner = document.getElementById("admin-banner");
  const adminBannerStatus = document.getElementById("admin-banner-status");
  const toastStack = document.getElementById("toast-stack");
  const statBookingsCount = document.getElementById("stat-bookings-count");
  const statEnquiriesCount = document.getElementById("stat-enquiries-count");
  const hallStatusToggle = document.getElementById("hall-status-toggle");
  const hallStatusText = document.getElementById("hall-status-text");
  const adminLeadsTableWrap = document.getElementById("admin-leads-table-wrap");
  const adminLeadsBody = document.getElementById("admin-leads-body");
  const adminLeadsEmpty = document.getElementById("admin-leads-empty");
  const bookingPreview = document.getElementById("booking-file-preview");
  const bookingDateInput = document.getElementById("booking-date-input");
  const bookingStatus = document.getElementById("booking-status");
  const markBooked = document.getElementById("mark-booked");
  const markAvailable = document.getElementById("mark-available");
  const refreshBookings = document.getElementById("refresh-bookings");
  const adminCalendarLabel = document.getElementById("admin-calendar-label");
  const adminCalendarDays = document.getElementById("admin-calendar-days");
  const adminCalendarPrev = document.getElementById("admin-calendar-prev");
  const adminCalendarNext = document.getElementById("admin-calendar-next");
  const leadsStatus = document.getElementById("leads-status");
  const refreshLeads = document.getElementById("refresh-leads");
  const siteSettingsForm = document.getElementById("site-settings-form");
  const settingsStatus = document.getElementById("settings-status");
  const refreshSettings = document.getElementById("refresh-settings");
  const reviewForm = document.getElementById("review-form");
  const reviewsStatus = document.getElementById("reviews-status");
  const refreshReviews = document.getElementById("refresh-reviews");
  const adminReviewList = document.getElementById("admin-review-list");
  const settingsPanel = document.getElementById("tab-settings");

  const settingsFields = {
    venueName: document.getElementById("setting-venue-name"),
    locationLabel: document.getElementById("setting-location-label"),
    phoneDisplay: document.getElementById("setting-phone"),
    whatsappDisplay: document.getElementById("setting-whatsapp"),
    instagramHandle: document.getElementById("setting-instagram"),
    mapsHref: document.getElementById("setting-maps"),
    hallPrice: document.getElementById("setting-hall-price"),
    roomPrice: document.getElementById("setting-room-price"),
    roomCount: document.getElementById("setting-room-count"),
    addressLine1: document.getElementById("setting-address-line-1"),
    addressLine2: document.getElementById("setting-address-line-2"),
    mapLabel: document.getElementById("setting-map-label"),
    inquiryHours: document.getElementById("setting-inquiry-hours")
  };

  const reviewFields = {
    name: document.getElementById("review-name"),
    event: document.getElementById("review-event"),
    date: document.getElementById("review-date"),
    text: document.getElementById("review-text")
  };

  const state = {
    role: null,
    email: "",
    currentMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    bookedDates: [],
    selectedBookingDate: "",
    enquiries: [],
    reviews: [],
    settings: { ...DEFAULT_SITE_SETTINGS },
    settingsSchema: null,
    enquiriesTableReady: true,
    reviewsWarning: null,
    hallStatusSupported: false,
    hallStatusField: null,
    hallStatusType: null,
    hallStatusOpen: true,
    unsubscribeVenueUpdates: null,
    unsubscribeEnquiries: null
  };

  const getTabButtons = () => Array.from(document.querySelectorAll("[data-tab-target]"));
  const getPanels = () => Array.from(document.querySelectorAll(".admin-panel"));

  const revealShell = () => {
    adminShell?.classList.remove("admin-shell--pending");
  };

  const hideShell = () => {
    adminShell?.classList.add("admin-shell--pending");
  };

  const showBoot = (message, tone = "default") => {
    adminBoot.hidden = false;
    setStatus(adminBootStatus, message, tone);
    revealShell();
  };

  const hideBoot = () => {
    adminBoot.hidden = true;
  };

  const redirectToLogin = () => {
    window.location.replace("login.html");
  };

  const setStatus = (element, message, tone = "default") => {
    if (!element) {
      return;
    }

    element.textContent = message;
    element.dataset.tone = tone;
  };

  const pushToast = (message, tone = "default") => {
    if (!toastStack || !message) {
      return;
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.dataset.tone = tone;
    toast.textContent = message;
    toastStack.append(toast);

    requestAnimationFrame(() => {
      toast.classList.add("is-visible");
    });

    window.setTimeout(() => {
      toast.classList.remove("is-visible");
      window.setTimeout(() => toast.remove(), 250);
    }, 3200);
  };

  const reportError = (error, fallbackMessage, statusElement) => {
    const message = describeSupabaseError(error, fallbackMessage);
    console.error("[diamond-admin]", fallbackMessage, error);
    setStatus(statusElement, message, "error");
    pushToast(message, "error");
  };

  const reportSuccess = (message, statusElement) => {
    setStatus(statusElement, message, "success");
    pushToast(message, "success");
  };

  const withButtonState = async (button, pendingText, task) => {
    if (!button) {
      return task();
    }

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = pendingText;

    try {
      return await task();
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  };

  const setBannerMessages = () => {
    const messages = [];

    if (state.role === "judah" && state.settingsSchema && !state.settingsSchema.hasPricingFields) {
      messages.push(
        "The current site_settings table does not yet include pricing fields. Run supabase/setup.sql to persist hall and room pricing from this dashboard."
      );
    }

    if (state.reviewsWarning?.code === "PGRST205") {
      messages.push(
        "The reviews table is missing. The public site is using fallback reviews until supabase/setup.sql is applied."
      );
    }

    if (!state.enquiriesTableReady) {
      messages.push(
        "The enquiries table is missing, so the inquiry inbox cannot load yet."
      );
    }

    if (!state.hallStatusSupported) {
      messages.push(
        "Hall Status is visible, but it needs a supported site_settings column (hall_status, venue_status, or is_hall_open) before it can persist globally."
      );
    }

    if (!messages.length) {
      adminBanner.hidden = true;
      setStatus(adminBannerStatus, "");
      return;
    }

    adminBanner.hidden = false;
    setStatus(adminBannerStatus, messages.map((message) => `• ${message}`).join("\n"));
  };

  const syncIdentity = () => {
    if (adminUserEmail) {
      adminUserEmail.textContent = `Signed in as ${state.email}`;
    }

    if (adminUserRole) {
      adminUserRole.textContent =
        state.role === "judah" ? "Role: Master Admin" : "Role: Employee Access";
    }
  };

  const syncHallStatusUI = () => {
    if (!hallStatusToggle || !hallStatusText) {
      return;
    }

    hallStatusToggle.checked = state.hallStatusOpen;
    hallStatusToggle.disabled = !state.hallStatusSupported;
    hallStatusText.textContent = state.hallStatusOpen
      ? "Open for bookings"
      : "Closed for maintenance";
  };

  const applyRoleAccess = () => {
    if (state.role !== "empl") {
      return;
    }

    document.getElementById("settings-tab")?.remove();
    document.getElementById("tab-settings")?.remove();
  };

  const activateTab = (target) => {
    const buttons = getTabButtons();
    const panels = getPanels();
    const hasTarget = buttons.some((button) => button.dataset.tabTarget === target);
    const activeTarget = hasTarget ? target : buttons[0]?.dataset.tabTarget;

    buttons.forEach((button) => {
      const isActive = button.dataset.tabTarget === activeTarget;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.id === `tab-${activeTarget}`;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };

  const bindTabs = () => {
    getTabButtons().forEach((button) => {
      if (button.dataset.bound === "true") {
        return;
      }

      button.dataset.bound = "true";
      button.addEventListener("click", () => activateTab(button.dataset.tabTarget));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          return;
        }

        const buttons = getTabButtons();
        const index = buttons.indexOf(button);
        let nextIndex = index;
        event.preventDefault();

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (index + 1) % buttons.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (index - 1 + buttons.length) % buttons.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = buttons.length - 1;
        }

        const nextButton = buttons[nextIndex];
        activateTab(nextButton.dataset.tabTarget);
        nextButton.focus();
      });
    });
  };

  const createElement = (tag, className, text) => {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (typeof text === "string") {
      element.textContent = text;
    }

    return element;
  };

  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const renderBookingPreview = () => {
    if (!bookingPreview) {
      return;
    }

    bookingPreview.value = JSON.stringify(state.bookedDates, null, 2);
  };

  const renderMiniCalendar = () => {
    if (!adminCalendarDays || !adminCalendarLabel) {
      return;
    }

    const activeBookings = new Set(state.bookedDates);
    const year = state.currentMonth.getFullYear();
    const month = state.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const leading = firstDay.getDay();
    const total = Math.ceil((leading + new Date(year, month + 1, 0).getDate()) / 7) * 7;
    const nodes = [];

    adminCalendarLabel.textContent = state.currentMonth.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric"
    });

    for (let index = 0; index < total; index += 1) {
      const cellDate = new Date(year, month, index - leading + 1);
      const cellKey = formatDateKey(cellDate);
      const cell = createElement("button", "mini-calendar__day", String(cellDate.getDate()));

      cell.type = "button";

      if (cellDate.getMonth() !== month) {
        cell.classList.add("is-outside");
        cell.disabled = true;
      } else {
        cell.addEventListener("click", () => {
          void toggleBookingDate(cellKey);
        });
      }

      if (activeBookings.has(cellKey)) {
        cell.classList.add("is-booked");
      }

      if (state.selectedBookingDate === cellKey) {
        cell.classList.add("is-selected");
      }

      nodes.push(cell);
    }

    adminCalendarDays.replaceChildren(...nodes);
  };

  const populateSettingsForm = () => {
    Object.entries(settingsFields).forEach(([key, field]) => {
      if (field) {
        field.value = state.settings[key] ?? "";
      }
    });
  };

  const renderReviewList = () => {
    if (!adminReviewList) {
      return;
    }

    if (!state.reviews.length) {
      const emptyCard = createElement("div", "empty-state", "No reviews available right now.");
      adminReviewList.replaceChildren(emptyCard);
      return;
    }

    const nodes = state.reviews.map((review) => {
      const article = createElement("article", "admin-review-card");
      const meta = createElement("div", "admin-review-card__meta");
      const name = createElement("span", "admin-review-card__name", review.name);
      const event = createElement("span", "", `${review.event} · ${review.date}`);
      const text = createElement("p", "", review.text);
      const actions = createElement("div", "admin-review-card__actions");
      const remove = createElement(
        "button",
        "admin-button admin-button--secondary admin-button--small",
        "Delete"
      );

      remove.type = "button";
      remove.addEventListener("click", async () => {
        if (!review.id || String(review.id).startsWith("fallback-")) {
          reportError(new Error("Fallback reviews cannot be deleted until the reviews table exists."), "Unable to delete review.", reviewsStatus);
          return;
        }

        try {
          await withButtonState(remove, "Deleting...", async () => {
            await deleteReview(review.id);
          });
          await loadReviews();
          reportSuccess(`Deleted review from ${review.name}.`, reviewsStatus);
        } catch (error) {
          reportError(error, "Unable to delete review.", reviewsStatus);
        }
      });

      meta.append(name, event);
      actions.append(remove);
      article.append(meta, text, actions);
      return article;
    });

    adminReviewList.replaceChildren(...nodes);
  };

  const renderEnquiries = () => {
    if (!adminLeadsBody || !adminLeadsEmpty || !adminLeadsTableWrap) {
      return;
    }

    if (!state.enquiries.length) {
      adminLeadsBody.replaceChildren();
      adminLeadsTableWrap.hidden = true;
      adminLeadsEmpty.hidden = false;
      return;
    }

    adminLeadsTableWrap.hidden = false;
    adminLeadsEmpty.hidden = true;

    const rows = state.enquiries.map((enquiry) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const phoneCell = document.createElement("td");
      const messageCell = document.createElement("td");
      const statusCell = document.createElement("td");
      const actionsCell = document.createElement("td");
      const phoneLink = document.createElement("a");
      const statusBadge = createElement("span", "table-status", enquiry.status);
      const actionWrap = createElement("div", "table-actions");
      const contactButton = createElement(
        "button",
        "admin-button admin-button--gold admin-button--small",
        enquiry.status === "contacted" ? "Contacted" : "Mark as Contacted"
      );
      const deleteButton = createElement(
        "button",
        "admin-button admin-button--danger admin-button--small",
        "Delete"
      );

      nameCell.textContent = enquiry.name;
      nameCell.dataset.label = "Customer";

      phoneLink.href = enquiry.phoneHref;
      phoneLink.textContent = enquiry.phoneDisplay;
      phoneCell.append(phoneLink);
      phoneCell.dataset.label = "Phone";

      messageCell.textContent = enquiry.message || "No message provided.";
      messageCell.dataset.label = "Message";
      statusBadge.dataset.status = enquiry.status;
      statusCell.append(statusBadge);
      statusCell.dataset.label = "Status";

      contactButton.type = "button";
      contactButton.disabled = enquiry.status === "contacted";
      contactButton.addEventListener("click", async () => {
        try {
          await withButtonState(contactButton, "Saving...", async () => {
            await updateEnquiryStatus(enquiry.id, "contacted");
          });
          await Promise.all([loadEnquiries(), loadAdminStats()]);
          reportSuccess(`Marked ${enquiry.name} as contacted.`, leadsStatus);
        } catch (error) {
          reportError(error, "Unable to update enquiry status.", leadsStatus);
        }
      });

      deleteButton.type = "button";
      deleteButton.addEventListener("click", async () => {
        try {
          await withButtonState(deleteButton, "Deleting...", async () => {
            await deleteEnquiry(enquiry.id);
          });
          await Promise.all([loadEnquiries(), loadAdminStats()]);
          reportSuccess(`Deleted enquiry from ${enquiry.name}.`, leadsStatus);
        } catch (error) {
          reportError(error, "Unable to delete enquiry.", leadsStatus);
        }
      });

      actionWrap.append(contactButton, deleteButton);
      actionsCell.append(actionWrap);
      actionsCell.dataset.label = "Actions";
      row.append(nameCell, phoneCell, messageCell, statusCell, actionsCell);
      return row;
    });

    adminLeadsBody.replaceChildren(...rows);
  };

  const loadAdminStats = async () => {
    try {
      const bookingResult = await supabaseClient
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "booked");

      if (bookingResult.error) {
        throw bookingResult.error;
      }

      statBookingsCount.textContent = String(bookingResult.count ?? 0);

      const enquiriesResult = await supabaseClient
        .from("enquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");

      if (enquiriesResult.error?.code === "PGRST205") {
        state.enquiriesTableReady = false;
        statEnquiriesCount.textContent = "0";
        setBannerMessages();
        return;
      }

      if (enquiriesResult.error) {
        throw enquiriesResult.error;
      }

      state.enquiriesTableReady = true;
      statEnquiriesCount.textContent = String(enquiriesResult.count ?? 0);
      setBannerMessages();
    } catch (error) {
      reportError(error, "Unable to load venue stats.", adminBannerStatus);
      adminBanner.hidden = false;
    }
  };

  const loadBookings = async () => {
    try {
      state.bookedDates = await fetchBookedDates();

      if (state.selectedBookingDate && bookingDateInput) {
        bookingDateInput.value = state.selectedBookingDate;
      }

      renderBookingPreview();
      renderMiniCalendar();
      setStatus(bookingStatus, "");
    } catch (error) {
      reportError(error, "Unable to load bookings.", bookingStatus);
    }
  };

  const loadEnquiries = async () => {
    try {
      const result = await fetchEnquiries();
      state.enquiries = result.enquiries;
      state.enquiriesTableReady = result.source !== "missing";
      renderEnquiries();

      if (result.source === "missing") {
        setStatus(
          leadsStatus,
          "The enquiries table is not ready yet. Run supabase/setup.sql to enable the inbox.",
          "error"
        );
      } else {
        setStatus(leadsStatus, "");
      }

      setBannerMessages();
    } catch (error) {
      reportError(error, "Unable to load enquiries.", leadsStatus);
    }
  };

  const loadSettings = async () => {
    if (state.role !== "judah" || !settingsPanel) {
      return;
    }

    try {
      const result = await fetchSiteSettings();
      state.settings = result.settings;
      state.settingsSchema = result.schema;
      populateSettingsForm();
      setBannerMessages();
      setStatus(settingsStatus, "");
    } catch (error) {
      reportError(error, "Unable to load site settings.", settingsStatus);
    }
  };

  const loadReviews = async () => {
    try {
      const result = await fetchReviews();
      state.reviews = result.reviews;
      state.reviewsWarning = result.warning;
      renderReviewList();
      setBannerMessages();

      if (result.source === "fallback") {
        setStatus(
          reviewsStatus,
          "Supabase reviews are not ready yet. Showing fallback reviews until setup.sql is applied.",
          "error"
        );
      } else {
        setStatus(reviewsStatus, "");
      }
    } catch (error) {
      reportError(error, "Unable to load reviews.", reviewsStatus);
    }
  };

  const loadHallStatus = async () => {
    state.hallStatusSupported = false;
    state.hallStatusField = null;
    state.hallStatusType = null;
    state.hallStatusOpen = true;

    for (const candidate of HALL_STATUS_FIELDS) {
      try {
        const { data, error } = await supabaseClient
          .from("site_settings")
          .select(`id, ${candidate.column}`)
          .eq("id", 1)
          .maybeSingle();

        if (error) {
          if (String(error.message ?? "").includes(candidate.column)) {
            continue;
          }

          throw error;
        }

        state.hallStatusSupported = true;
        state.hallStatusField = candidate.column;
        state.hallStatusType = candidate.type;
        state.hallStatusOpen =
          candidate.type === "boolean"
            ? Boolean(data?.[candidate.column])
            : String(data?.[candidate.column] ?? "open").toLowerCase() !== "closed";
        break;
      } catch (error) {
        if (error?.code === "PGRST205" || String(error?.message ?? "").includes(candidate.column)) {
          continue;
        }

        reportError(error, "Unable to load hall status.", adminBannerStatus);
        adminBanner.hidden = false;
        break;
      }
    }

    syncHallStatusUI();
    setBannerMessages();
  };

  const saveHallStatus = async (isOpen) => {
    if (!state.hallStatusSupported || !state.hallStatusField) {
      throw new Error(
        "Hall status cannot be saved yet because the site_settings table has no supported hall status column."
      );
    }

    const payload =
      state.hallStatusType === "boolean"
        ? { [state.hallStatusField]: isOpen }
        : { [state.hallStatusField]: isOpen ? "open" : "closed" };

    const { error } = await supabaseClient
      .from("site_settings")
      .update(payload)
      .eq("id", 1);

    if (error) {
      throw error;
    }

    state.hallStatusOpen = isOpen;
    syncHallStatusUI();
  };

  const toggleBookingDate = async (dateKey) => {
    state.selectedBookingDate = dateKey;

    if (bookingDateInput) {
      bookingDateInput.value = dateKey;
    }

    renderMiniCalendar();

    const isBooked = state.bookedDates.includes(dateKey);
    const nextStatus = isBooked ? "available" : "booked";

    try {
      await upsertBookingStatus(dateKey, nextStatus);
      await Promise.all([loadBookings(), loadAdminStats()]);
      reportSuccess(
        nextStatus === "booked"
          ? `Marked ${dateKey} as booked.`
          : `Marked ${dateKey} as available.`,
        bookingStatus
      );
    } catch (error) {
      reportError(error, "Unable to toggle booking date.", bookingStatus);
    }
  };

  const loadDashboardData = async () => {
    const tasks = [loadAdminStats(), loadBookings(), loadEnquiries(), loadReviews(), loadHallStatus()];

    if (state.role === "judah") {
      tasks.push(loadSettings());
    }

    await Promise.all(tasks);
  };

  const startLiveUpdates = () => {
    if (!state.unsubscribeVenueUpdates) {
      state.unsubscribeVenueUpdates = subscribeToVenueUpdates({
        onBookingsChange: () => {
          void loadBookings();
          void loadAdminStats();
        },
        onSettingsChange: () => {
          if (state.role === "judah") {
            void loadSettings();
          }

          void loadHallStatus();
        },
        onReviewsChange: () => {
          void loadReviews();
        },
        onError: (error) => {
          reportError(error, "Live data sync is temporarily unavailable.", adminBannerStatus);
          adminBanner.hidden = false;
        }
      });
    }

    if (!state.unsubscribeEnquiries) {
      const channel = supabaseClient
        .channel(`diamond-enquiries-${Math.random().toString(36).slice(2, 10)}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "enquiries" },
          () => {
            void loadAdminStats();
            void loadEnquiries();
          }
        )
        .subscribe((status, error) => {
          if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
            reportError(error, "Lead sync is temporarily unavailable.", adminBannerStatus);
            adminBanner.hidden = false;
          }
        });

      state.unsubscribeEnquiries = () => {
        void supabaseClient.removeChannel(channel);
      };
    }
  };

  const stopLiveUpdates = () => {
    state.unsubscribeVenueUpdates?.();
    state.unsubscribeVenueUpdates = null;
    state.unsubscribeEnquiries?.();
    state.unsubscribeEnquiries = null;
  };

  const clearRoleSession = () => {
    sessionStorage.clear();
  };

  const setRoleSession = () => {
    sessionStorage.setItem("diamond_admin_role", state.role);
    sessionStorage.setItem("diamond_admin_email", state.email);
  };

  const getVerifiedAdminContext = async () => {
    try {
      const session = await getCurrentSession();

      if (!session) {
        return null;
      }

      const { data, error } = await supabaseClient.auth.getUser();

      if (error) {
        throw error;
      }

      const email = data.user?.email?.toLowerCase() ?? "";
      const role = ROLE_BY_EMAIL[email];

      if (!email || !role) {
        return null;
      }

      return { email, role };
    } catch (error) {
      throw error;
    }
  };

  adminLogout?.addEventListener("click", async () => {
    try {
      await withButtonState(adminLogout, "Signing out...", async () => {
        await supabaseClient.auth.signOut();
      });
    } catch (error) {
      reportError(error, "Unable to sign out.", adminBannerStatus);
      adminBanner.hidden = false;
      return;
    }

    stopLiveUpdates();
    sessionStorage.clear();
    redirectToLogin();
  });

  adminBootRetry?.addEventListener("click", () => {
    window.location.reload();
  });

  markBooked?.addEventListener("click", async () => {
    try {
      await withButtonState(markBooked, "Saving...", async () => {
        await upsertBookingStatus(bookingDateInput?.value, "booked");
      });
      state.selectedBookingDate = bookingDateInput?.value ?? "";
      await Promise.all([loadBookings(), loadAdminStats()]);
      reportSuccess("Booking updated to booked.", bookingStatus);
    } catch (error) {
      reportError(error, "Unable to mark date as booked.", bookingStatus);
    }
  });

  markAvailable?.addEventListener("click", async () => {
    try {
      await withButtonState(markAvailable, "Saving...", async () => {
        await upsertBookingStatus(bookingDateInput?.value, "available");
      });
      state.selectedBookingDate = bookingDateInput?.value ?? "";
      await Promise.all([loadBookings(), loadAdminStats()]);
      reportSuccess("Booking updated to available.", bookingStatus);
    } catch (error) {
      reportError(error, "Unable to mark date as available.", bookingStatus);
    }
  });

  refreshBookings?.addEventListener("click", async () => {
    try {
      await withButtonState(refreshBookings, "Refreshing...", async () => {
        await Promise.all([loadBookings(), loadAdminStats()]);
      });
      reportSuccess("Bookings refreshed.", bookingStatus);
    } catch (error) {
      reportError(error, "Unable to refresh bookings.", bookingStatus);
    }
  });

  bookingDateInput?.addEventListener("input", () => {
    state.selectedBookingDate = bookingDateInput.value;
    renderMiniCalendar();
  });

  adminCalendarPrev?.addEventListener("click", () => {
    state.currentMonth = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() - 1, 1);
    renderMiniCalendar();
  });

  adminCalendarNext?.addEventListener("click", () => {
    state.currentMonth = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() + 1, 1);
    renderMiniCalendar();
  });

  hallStatusToggle?.addEventListener("change", async () => {
    const nextValue = hallStatusToggle.checked;
    hallStatusToggle.disabled = true;

    try {
      await saveHallStatus(nextValue);
      reportSuccess(
        nextValue ? "Hall status changed to open." : "Hall status changed to closed.",
        adminBannerStatus
      );
    } catch (error) {
      hallStatusToggle.checked = state.hallStatusOpen;
      syncHallStatusUI();
      reportError(error, "Unable to update hall status.", adminBannerStatus);
      adminBanner.hidden = false;
    } finally {
      hallStatusToggle.disabled = !state.hallStatusSupported;
    }
  });

  siteSettingsForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (state.role !== "judah") {
      reportError(new Error("Only Judah can edit master settings."), "Only Judah can edit master settings.", settingsStatus);
      return;
    }

    const submitButton = siteSettingsForm.querySelector('button[type="submit"]');

    try {
      await withButtonState(submitButton, "Saving...", async () => {
        const result = await saveSiteSettings(
          {
            venueName: settingsFields.venueName?.value,
            locationLabel: settingsFields.locationLabel?.value,
            phoneDisplay: settingsFields.phoneDisplay?.value,
            whatsappDisplay: settingsFields.whatsappDisplay?.value,
            instagramHandle: settingsFields.instagramHandle?.value,
            mapsHref: settingsFields.mapsHref?.value,
            hallPrice: settingsFields.hallPrice?.value,
            roomPrice: settingsFields.roomPrice?.value,
            roomCount: settingsFields.roomCount?.value,
            addressLine1: settingsFields.addressLine1?.value,
            addressLine2: settingsFields.addressLine2?.value,
            mapLabel: settingsFields.mapLabel?.value,
            inquiryHours: settingsFields.inquiryHours?.value
          },
          state.settingsSchema
        );

        state.settings = result.settings;
        state.settingsSchema = result.schema;
        populateSettingsForm();
        setBannerMessages();

        if (result.unsupportedFields.length) {
          reportError(
            new Error(`Saved supported fields. ${result.unsupportedFields.join(", ")} still require supabase/setup.sql.`),
            "Some fields are not yet supported by the current schema.",
            settingsStatus
          );
        } else {
          reportSuccess("Settings Updated", settingsStatus);
        }
      });
    } catch (error) {
      reportError(error, "Unable to save site settings.", settingsStatus);
    }
  });

  refreshSettings?.addEventListener("click", async () => {
    if (state.role !== "judah") {
      return;
    }

    try {
      await withButtonState(refreshSettings, "Refreshing...", async () => {
        await Promise.all([loadSettings(), loadHallStatus()]);
      });
      reportSuccess("Settings refreshed.", settingsStatus);
    } catch (error) {
      reportError(error, "Unable to refresh settings.", settingsStatus);
    }
  });

  reviewForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = reviewForm.querySelector('button[type="submit"]');

    try {
      await withButtonState(submitButton, "Saving...", async () => {
        await addReview({
          name: reviewFields.name?.value,
          event: reviewFields.event?.value,
          date: reviewFields.date?.value,
          text: reviewFields.text?.value
        });
      });

      reviewForm.reset();
      await loadReviews();
      reportSuccess("Review added.", reviewsStatus);
    } catch (error) {
      reportError(error, "Unable to add review.", reviewsStatus);
    }
  });

  refreshReviews?.addEventListener("click", async () => {
    try {
      await withButtonState(refreshReviews, "Refreshing...", async () => {
        await loadReviews();
      });
      reportSuccess("Reviews refreshed.", reviewsStatus);
    } catch (error) {
      reportError(error, "Unable to refresh reviews.", reviewsStatus);
    }
  });

  refreshLeads?.addEventListener("click", async () => {
    try {
      await withButtonState(refreshLeads, "Refreshing...", async () => {
        await Promise.all([loadEnquiries(), loadAdminStats()]);
      });
      reportSuccess("Enquiries refreshed.", leadsStatus);
    } catch (error) {
      reportError(error, "Unable to refresh enquiries.", leadsStatus);
    }
  });

  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    if (!session) {
      stopLiveUpdates();
      sessionStorage.clear();
      redirectToLogin();
      return;
    }

    try {
      const { data, error } = await supabaseClient.auth.getUser();

      if (error || !ROLE_BY_EMAIL[data.user?.email?.toLowerCase() ?? ""]) {
        stopLiveUpdates();
        sessionStorage.clear();
        redirectToLogin();
      }
    } catch (_error) {
      stopLiveUpdates();
      sessionStorage.clear();
      redirectToLogin();
    }
  });

  const initialize = async () => {
    hideShell();
    showBoot("Checking admin access...");

    try {
      const context = await getVerifiedAdminContext();

      if (!context) {
        sessionStorage.clear();
        showBoot("No active admin session was found. Redirecting to login...", "error");
        window.setTimeout(redirectToLogin, 1200);
        return;
      }

      state.role = context.role;
      state.email = context.email;
      setRoleSession();
      applyRoleAccess();
      syncIdentity();
      bindTabs();
      activateTab("bookings");
      hideBoot();
      adminDashboard.hidden = false;
      revealShell();
      startLiveUpdates();
      await loadDashboardData();
    } catch (error) {
      const message = describeSupabaseError(error, "Unable to verify admin access.");
      sessionStorage.clear();
      adminDashboard.hidden = true;
      showBoot(message, "error");
    }
  };

  initialize();
});

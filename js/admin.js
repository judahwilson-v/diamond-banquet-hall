document.addEventListener("DOMContentLoaded", () => {
  const ADMIN_PASSWORD = "Diamond@2025";
  const SESSION_KEY = "diamondAdminSession";
  const SETTINGS_KEY = "diamondSiteSettings";
  const BOOKINGS_KEY = "diamondBookedDates";
  const REVIEWS_KEY = "diamondReviews";
  const DEFAULT_SETTINGS = {
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
  };

  const adminLogin = document.getElementById("admin-login");
  const adminDashboard = document.getElementById("admin-dashboard");
  const adminLoginCard = document.getElementById("admin-login-card");
  const adminLoginForm = document.getElementById("admin-login-form");
  const adminPassword = document.getElementById("admin-password");
  const adminLoginStatus = document.getElementById("admin-login-status");
  const adminLogout = document.getElementById("admin-logout");
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  const panels = document.querySelectorAll(".admin-panel");
  const bookingPreview = document.getElementById("booking-file-preview");
  const bookingDateInput = document.getElementById("booking-date-input");
  const bookingStatus = document.getElementById("booking-status");
  const markBooked = document.getElementById("mark-booked");
  const markAvailable = document.getElementById("mark-available");
  const downloadBookings = document.getElementById("download-bookings");
  const adminCalendarLabel = document.getElementById("admin-calendar-label");
  const adminCalendarDays = document.getElementById("admin-calendar-days");
  const adminCalendarPrev = document.getElementById("admin-calendar-prev");
  const adminCalendarNext = document.getElementById("admin-calendar-next");
  const siteSettingsForm = document.getElementById("site-settings-form");
  const settingsStatus = document.getElementById("settings-status");
  const reviewForm = document.getElementById("review-form");
  const reviewsStatus = document.getElementById("reviews-status");
  const adminReviewList = document.getElementById("admin-review-list");
  const downloadReviews = document.getElementById("download-reviews");

  const settingsFields = {
    phoneDisplay: document.getElementById("setting-phone"),
    whatsappDisplay: document.getElementById("setting-whatsapp"),
    instagramHandle: document.getElementById("setting-instagram"),
    mapsHref: document.getElementById("setting-maps"),
    hallPrice: document.getElementById("setting-hall-price"),
    roomPrice: document.getElementById("setting-room-price"),
    roomCount: document.getElementById("setting-room-count"),
  };

  const reviewFields = {
    name: document.getElementById("review-name"),
    event: document.getElementById("review-event"),
    date: document.getElementById("review-date"),
    text: document.getElementById("review-text"),
  };

  const state = {
    currentMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    bookedDates: [],
    reviews: [],
  };

  const readJSONStorage = (key, fallback) => {
    try {
      const rawValue = localStorage.getItem(key);
      return rawValue ? JSON.parse(rawValue) : fallback;
    } catch (error) {
      return fallback;
    }
  };

  const writeJSONStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const setStatus = (element, message, tone = "default") => {
    if (!element) {
      return;
    }

    element.textContent = message;
    element.dataset.tone = tone;
  };

  const showDashboard = () => {
    adminLogin.hidden = true;
    adminDashboard.hidden = false;
  };

  const showLogin = () => {
    adminLogin.hidden = false;
    adminDashboard.hidden = true;
    adminPassword?.focus();
  };

  const activateTab = (target) => {
    tabButtons.forEach((button) => {
      const isActive = button.dataset.tabTarget === target;
      button.classList.toggle("is-active", isActive);
    });

    panels.forEach((panel) => {
      const isActive = panel.id === `tab-${target}`;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };

  const parseArrayFromFile = (text, variableName, fallback) => {
    try {
      const matcher = new RegExp(`const\\s+${variableName}\\s*=\\s*(\\[[\\s\\S]*?\\]);`);
      const match = text.match(matcher);
      return match ? new Function(`return ${match[1]};`)() : fallback;
    } catch (error) {
      return fallback;
    }
  };

  const fetchBookingsFile = async () => {
    const response = await fetch("js/bookings.js", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Unable to fetch bookings.js");
    }

    return response.text();
  };

  const fetchReviewsFile = async () => {
    const response = await fetch("js/reviews.js", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Unable to fetch reviews.js");
    }

    return response.text();
  };

  const generateBookingsSource = (dates) => `// DIAMOND BANQUET HALL — Booked Dates
// Format: "YYYY-MM-DD"
// Edit this file to mark/unmark dates.
// Save the file and push to GitHub — site updates automatically.

const bookedDates = ${JSON.stringify([...dates].sort(), null, 2)};
`;

  const generateReviewsSource = (reviewList) => `// DIAMOND BANQUET HALL — Customer Reviews
// To add a review: copy the last object, paste below it,
// update name, event, date, and text. Save + push.

const reviews = ${JSON.stringify(reviewList, null, 2)};
`;

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const renderBookingPreview = () => {
    if (bookingPreview) {
      bookingPreview.value = generateBookingsSource(state.bookedDates);
    }
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

    adminCalendarLabel.textContent = state.currentMonth.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });

    adminCalendarDays.innerHTML = "";

    for (let index = 0; index < total; index += 1) {
      const cellDate = new Date(year, month, index - leading + 1);
      const cell = document.createElement("div");
      const cellKey = formatDateKey(cellDate);

      cell.className = "mini-calendar__day";
      cell.textContent = String(cellDate.getDate());

      if (cellDate.getMonth() !== month) {
        cell.classList.add("is-outside");
      }

      if (activeBookings.has(cellKey)) {
        cell.classList.add("is-booked");
      }

      adminCalendarDays.append(cell);
    }
  };

  const loadSiteSettings = () => {
    const localSettings = readJSONStorage(SETTINGS_KEY, {});
    const merged = {
      ...DEFAULT_SETTINGS,
      ...localSettings,
    };

    Object.entries(settingsFields).forEach(([key, field]) => {
      if (!field) {
        return;
      }

      field.value = merged[key];
    });
  };

  const saveSiteSettings = () => {
    const payload = {
      phoneDisplay: settingsFields.phoneDisplay.value.trim() || DEFAULT_SETTINGS.phoneDisplay,
      whatsappDisplay:
        settingsFields.whatsappDisplay.value.trim() || DEFAULT_SETTINGS.whatsappDisplay,
      instagramHandle:
        settingsFields.instagramHandle.value.trim() || DEFAULT_SETTINGS.instagramHandle,
      mapsHref: settingsFields.mapsHref.value.trim() || DEFAULT_SETTINGS.mapsHref,
      hallPrice: Number(settingsFields.hallPrice.value) || DEFAULT_SETTINGS.hallPrice,
      roomPrice: Number(settingsFields.roomPrice.value) || DEFAULT_SETTINGS.roomPrice,
      roomCount: Number(settingsFields.roomCount.value) || DEFAULT_SETTINGS.roomCount,
    };

    payload.phoneHref = `tel:${payload.phoneDisplay.replace(/[^+\d]/g, "")}`;
    payload.whatsappHref = `https://wa.me/${payload.whatsappDisplay.replace(/[^\d]/g, "")}`;
    payload.instagramHref = `https://instagram.com/${payload.instagramHandle.replace(/^@/, "")}`;

    writeJSONStorage(SETTINGS_KEY, payload);
    return payload;
  };

  const renderReviewList = () => {
    if (!adminReviewList) {
      return;
    }

    adminReviewList.innerHTML = "";

    state.reviews.forEach((review) => {
      const article = document.createElement("article");
      article.className = "admin-review-card";
      article.innerHTML = `
        <div class="admin-review-card__meta">
          <span class="admin-review-card__name">${review.name}</span>
          <span>${review.event} · ${review.date}</span>
        </div>
        <p>${review.text}</p>
      `;
      adminReviewList.append(article);
    });
  };

  const loadBookings = async () => {
    const localDates = readJSONStorage(BOOKINGS_KEY, null);

    if (Array.isArray(localDates)) {
      state.bookedDates = [...new Set(localDates)].sort();
      renderBookingPreview();
      renderMiniCalendar();
      return;
    }

    try {
      const fileText = await fetchBookingsFile();
      const parsed = parseArrayFromFile(fileText, "bookedDates", bookedDates);
      state.bookedDates = [...new Set(parsed)].sort();
      renderBookingPreview();
      renderMiniCalendar();
    } catch (error) {
      state.bookedDates = [...new Set(bookedDates)].sort();
      renderBookingPreview();
      renderMiniCalendar();
      setStatus(bookingStatus, "Using fallback bookings from the local script.", "error");
    }
  };

  const loadReviews = async () => {
    const localReviews = readJSONStorage(REVIEWS_KEY, null);

    if (Array.isArray(localReviews)) {
      state.reviews = localReviews;
      renderReviewList();
      return;
    }

    try {
      const fileText = await fetchReviewsFile();
      const parsed = parseArrayFromFile(fileText, "reviews", reviews);
      state.reviews = Array.isArray(parsed) ? parsed : reviews;
    } catch (error) {
      state.reviews = reviews;
    }

    renderReviewList();
  };

  adminLoginForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (adminPassword.value === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      adminPassword.classList.remove("is-error");
      setStatus(adminLoginStatus, "");
      showDashboard();
      return;
    }

    adminPassword.classList.add("is-error");
    adminLoginCard?.classList.remove("is-shaking");
    void adminLoginCard?.offsetWidth;
    adminLoginCard?.classList.add("is-shaking");
    setStatus(adminLoginStatus, "Incorrect password", "error");
  });

  adminPassword?.addEventListener("input", () => {
    adminPassword.classList.remove("is-error");
    setStatus(adminLoginStatus, "");
  });

  adminLogout?.addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
    showLogin();
  });

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tabTarget));
  });

  markBooked?.addEventListener("click", () => {
    if (!bookingDateInput?.value) {
      setStatus(bookingStatus, "Choose a date first.", "error");
      return;
    }

    state.bookedDates = [...new Set([...state.bookedDates, bookingDateInput.value])].sort();
    writeJSONStorage(BOOKINGS_KEY, state.bookedDates);
    renderBookingPreview();
    renderMiniCalendar();
    setStatus(bookingStatus, "Date marked as booked.", "success");
  });

  markAvailable?.addEventListener("click", () => {
    if (!bookingDateInput?.value) {
      setStatus(bookingStatus, "Choose a date first.", "error");
      return;
    }

    state.bookedDates = state.bookedDates.filter((date) => date !== bookingDateInput.value);
    writeJSONStorage(BOOKINGS_KEY, state.bookedDates);
    renderBookingPreview();
    renderMiniCalendar();
    setStatus(bookingStatus, "Date marked as available.", "success");
  });

  downloadBookings?.addEventListener("click", () => {
    downloadFile("bookings.js", generateBookingsSource(state.bookedDates));
    setStatus(bookingStatus, "Downloaded updated bookings.js", "success");
  });

  adminCalendarPrev?.addEventListener("click", () => {
    state.currentMonth = new Date(
      state.currentMonth.getFullYear(),
      state.currentMonth.getMonth() - 1,
      1
    );
    renderMiniCalendar();
  });

  adminCalendarNext?.addEventListener("click", () => {
    state.currentMonth = new Date(
      state.currentMonth.getFullYear(),
      state.currentMonth.getMonth() + 1,
      1
    );
    renderMiniCalendar();
  });

  siteSettingsForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSiteSettings();
    setStatus(settingsStatus, "Saved settings to localStorage for this device.", "success");
  });

  reviewForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const payload = {
      name: reviewFields.name.value.trim(),
      event: reviewFields.event.value,
      date: reviewFields.date.value.trim(),
      text: reviewFields.text.value.trim(),
    };

    if (!payload.name || !payload.date || !payload.text) {
      setStatus(reviewsStatus, "Name, date, and review text are required.", "error");
      return;
    }

    state.reviews.push(payload);
    writeJSONStorage(REVIEWS_KEY, state.reviews);
    renderReviewList();
    reviewForm.reset();
    setStatus(reviewsStatus, "Review added to the local preview list.", "success");
  });

  downloadReviews?.addEventListener("click", () => {
    downloadFile("reviews.js", generateReviewsSource(state.reviews));
    setStatus(reviewsStatus, "Downloaded updated reviews.js", "success");
  });

  if (sessionStorage.getItem(SESSION_KEY) === "true") {
    showDashboard();
  } else {
    showLogin();
  }

  activateTab("bookings");
  loadBookings();
  loadSiteSettings();
  loadReviews();
});

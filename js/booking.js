import {
  DEFAULT_SITE_SETTINGS,
  buildWhatsAppLink,
  describeSupabaseError,
  fetchBookingAvailabilityWindow,
  fetchSiteSettings,
  sendBookingAdminNotification,
  submitBookingRequest
} from "./site-data.js";

const FIXED_BOOKING_START = "06:00";
const FIXED_BOOKING_END = "12:00";

const loadingModule = {
  init() {
    const loadingOverlay = document.getElementById("booking-loading");

    if (!loadingOverlay) {
      return;
    }

    let finalizeTimer = null;

    const finalizeHide = () => {
      if (loadingOverlay.hidden) {
        return;
      }

      loadingOverlay.hidden = true;
      loadingOverlay.setAttribute("aria-hidden", "true");
      loadingOverlay.removeEventListener("transitionend", handleTransitionEnd);

      if (finalizeTimer) {
        window.clearTimeout(finalizeTimer);
      }
    };

    const handleTransitionEnd = (event) => {
      if (event.target !== loadingOverlay || event.propertyName !== "opacity") {
        return;
      }

      finalizeHide();
    };

    window.setTimeout(() => {
      loadingOverlay.classList.add("is-hiding");
      loadingOverlay.setAttribute("aria-hidden", "true");
    }, 1500);

    loadingOverlay.addEventListener("transitionend", handleTransitionEnd);
    finalizeTimer = window.setTimeout(finalizeHide, 2050);
  }
};

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDateKey = (dateKey) => new Date(`${dateKey}T00:00:00`);

const formatLongDate = (dateKey) =>
  parseDateKey(dateKey).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

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

const getPhoneDigitCount = (value) => String(value ?? "").replace(/\D/g, "").length;

const normalizeSingleLineInput = (value) =>
  String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();

const normalizeEmailInput = (value) => normalizeSingleLineInput(value).toLowerCase();

const normalizeNotesInput = (value) =>
  String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const wait = (delayMs) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, delayMs);
  });

const isRetryableRequestError = (error) => {
  const message = String(error?.message ?? "").toLowerCase();

  return (
    error?.name === "AuthRetryableFetchError" ||
    message.includes("network") ||
    message.includes("failed to fetch") ||
    message.includes("fetch failed") ||
    message.includes("timed out")
  );
};

const runWithSingleRetry = async (task, { delayMs = 650 } = {}) => {
  try {
    return await task();
  } catch (error) {
    if (!isRetryableRequestError(error)) {
      throw error;
    }

    await wait(delayMs);
    return task();
  }
};

const buildBookingMessage = ({ siteSettings, selectedDate, values }) => {
  const lines = [
    `Hello ${siteSettings.venueName}, I would like to request a booking.`,
    `Date: ${formatLongDate(selectedDate)}`,
    `Booking window: ${FIXED_BOOKING_START} - ${FIXED_BOOKING_END}`,
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Event Type: ${values.eventType || "Other"}`,
    `Attendees: ${values.attendees}`
  ];

  if (values.email) {
    lines.push(`Email: ${values.email}`);
  }

  if (values.organisation) {
    lines.push(`Organisation: ${values.organisation}`);
  }

  if (values.notes) {
    lines.push(`Notes: ${values.notes}`);
  }

  return lines.join("\n");
};

const calendarModule = {
  init(state) {
    this.state = state;
    this.monthLabel = document.getElementById("booking-calendar-month-label");
    this.calendarDays = document.getElementById("booking-calendar-days");
    this.calendarNote = document.getElementById("booking-calendar-note");
    this.calendarRetry = document.getElementById("booking-calendar-retry");
    this.calendarPrev = document.getElementById("booking-calendar-prev");
    this.calendarNext = document.getElementById("booking-calendar-next");
    this.requestSequence = 0;

    this.calendarPrev?.addEventListener("click", () => {
      this.state.currentMonth = new Date(
        this.state.currentMonth.getFullYear(),
        this.state.currentMonth.getMonth() - 1,
        1
      );
      this.state.selectedDate = null;
      selectionModule.render(this.state);
      void this.loadAvailability();
    });

    this.calendarNext?.addEventListener("click", () => {
      this.state.currentMonth = new Date(
        this.state.currentMonth.getFullYear(),
        this.state.currentMonth.getMonth() + 1,
        1
      );
      this.state.selectedDate = null;
      selectionModule.render(this.state);
      void this.loadAvailability();
    });

    this.calendarRetry?.addEventListener("click", () => {
      void this.loadAvailability();
    });

    this.render();
    void this.loadAvailability();
  },

  getDayAvailabilityState(dateKey) {
    if (this.state.bookingAvailabilityState === "unavailable") {
      return "unavailable";
    }

    if (this.state.bookedDateSet.has(dateKey)) {
      return "booked";
    }

    return "available";
  },

  getCalendarMessage() {
    if (this.state.siteSettings.hallStatusOpen === false) {
      return "Hall bookings are temporarily paused. Please call or WhatsApp the Diamond team for updates.";
    }

    if (this.state.bookingAvailabilityState === "loading") {
      return "Loading confirmed booking dates...";
    }

    if (this.state.bookingAvailabilityState === "unavailable") {
      return (
        this.state.bookingAvailabilityErrorMessage ||
        "Live availability is temporarily unavailable. Please retry or contact Diamond directly."
      );
    }

    if (this.state.selectedDate) {
      return `Selected date: ${formatLongDate(this.state.selectedDate)}.`;
    }

    return "Select an available future date to continue.";
  },

  async loadAvailability() {
    const activeRequest = this.requestSequence + 1;
    this.requestSequence = activeRequest;
    this.state.bookingAvailabilityState = "loading";
    this.render();

    const rangeStart = formatDateKey(
      new Date(this.state.currentMonth.getFullYear(), this.state.currentMonth.getMonth(), 1)
    );
    const rangeEnd = formatDateKey(
      new Date(this.state.currentMonth.getFullYear(), this.state.currentMonth.getMonth() + 1, 0)
    );

    try {
      const result = await runWithSingleRetry(() =>
        fetchBookingAvailabilityWindow({
          startDate: rangeStart,
          endDate: rangeEnd
        })
      );

      if (activeRequest !== this.requestSequence) {
        return;
      }

      this.state.bookedDateSet = new Set(result.bookedDates);
      this.state.bookingAvailabilityErrorMessage = "";
      this.state.bookingAvailabilityState = "ready";

      if (this.state.selectedDate && this.state.bookedDateSet.has(this.state.selectedDate)) {
        this.state.selectedDate = null;
      }

      this.render();
    } catch (error) {
      if (activeRequest !== this.requestSequence) {
        return;
      }

      this.state.bookedDateSet = new Set();
      this.state.selectedDate = null;
      this.state.bookingAvailabilityErrorMessage = describeSupabaseError(
        error,
        "Live availability is temporarily unavailable. Please retry or contact Diamond directly."
      );
      this.state.bookingAvailabilityState = "unavailable";
      this.render();
      console.warn("Live booking availability is unavailable.", error);
    }
  },

  render() {
    if (!this.monthLabel || !this.calendarDays || !this.calendarNote) {
      return;
    }

    const isSubmitting = this.state.isSubmitting === true;
    const isAvailabilityUnavailable = this.state.bookingAvailabilityState === "unavailable";
    const today = new Date();
    const todayFloor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const year = this.state.currentMonth.getFullYear();
    const month = this.state.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const leadingDays = firstDay.getDay();
    const totalCells = Math.ceil((leadingDays + lastDay.getDate()) / 7) * 7;
    const dayButtons = [];

    this.monthLabel.textContent = this.state.currentMonth.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric"
    });

    if (this.calendarPrev) {
      this.calendarPrev.disabled = isSubmitting;
    }

    if (this.calendarNext) {
      this.calendarNext.disabled = isSubmitting;
    }

    for (let cellIndex = 0; cellIndex < totalCells; cellIndex += 1) {
      const cellDate = new Date(year, month, cellIndex - leadingDays + 1);
      const cellKey = formatDateKey(cellDate);
      const button = createElement("button", "booking-calendar-day");
      const number = createElement("span", "booking-calendar-day__number", String(cellDate.getDate()));
      const meta = createElement("span", "booking-calendar-day__meta");
      const indicator = createElement("span", "booking-calendar-day__indicator");
      const isCurrentMonth = cellDate.getMonth() === month;
      const isToday = cellDate.getTime() === todayFloor.getTime();
      const isPast = cellDate < todayFloor;
      const isPaused = this.state.siteSettings.hallStatusOpen === false;
      const dayState = this.getDayAvailabilityState(cellKey);
      const isSelectable =
        isCurrentMonth &&
        !isPast &&
        !isPaused &&
        !isSubmitting &&
        !isAvailabilityUnavailable &&
        dayState !== "booked";

      button.type = "button";
      button.dataset.date = cellKey;

      if (!isCurrentMonth) {
        button.classList.add("is-outside");
      }

      if (isToday) {
        button.classList.add("is-today");
      }

      if (isPast && isCurrentMonth) {
        button.classList.add("is-past");
      }

      if (isPaused && isCurrentMonth && !isPast) {
        button.classList.add("is-paused");
      }

      if (dayState === "unavailable") {
        button.classList.add("is-unavailable");
        indicator.classList.add("booking-calendar-day__indicator--unavailable");
        meta.textContent = "Offline";
      } else if (dayState === "booked") {
        button.classList.add("is-booked");
        indicator.classList.add("booking-calendar-day__indicator--booked");
        meta.textContent = "Booked";
      } else {
        button.classList.add("is-available");
        indicator.classList.add("booking-calendar-day__indicator--available");
        meta.textContent = "Open";
      }

      if (this.state.selectedDate === cellKey) {
        button.classList.add("is-selected");
        button.setAttribute("aria-pressed", "true");
      }

      button.setAttribute(
        "aria-label",
        `${dayState === "booked" ? "Confirmed booking on" : dayState === "unavailable" ? "Live availability unavailable for" : "Available"} ${formatLongDate(cellKey)}`
      );

      if (!isSelectable) {
        button.disabled = true;
      } else {
        button.addEventListener("click", () => {
          this.state.selectedDate = cellKey;
          this.render();
        });
      }

      button.append(number, meta, indicator);
      dayButtons.push(button);
    }

    this.calendarDays.replaceChildren(...dayButtons);
    this.calendarNote.textContent = this.getCalendarMessage();

    if (this.calendarRetry) {
      this.calendarRetry.hidden = this.state.bookingAvailabilityState !== "unavailable";
      this.calendarRetry.disabled = this.state.bookingAvailabilityState === "loading";
    }

    selectionModule.render(this.state);
    submitModule.syncAvailabilityState?.();
  }
};

const selectionModule = {
  init(state) {
    this.state = state;
    this.selectionGrid = document.getElementById("booking-slot-grid");
    this.selectionSummary = document.getElementById("booking-slot-summary");
    this.selectionNote = document.getElementById("booking-slot-note");
    this.render();
  },

  getSummaryText() {
    if (!this.state.selectedDate) {
      return "Selected date: No date selected";
    }

    return `Selected date: ${formatLongDate(this.state.selectedDate)}`;
  },

  getNoteText() {
    if (this.state.bookingAvailabilityState === "unavailable") {
      return "Live availability is temporarily unavailable. Please retry or contact Diamond Banquet Hall directly.";
    }

    if (this.state.siteSettings.hallStatusOpen === false) {
      return "Hall bookings are temporarily paused. Please contact Diamond Banquet Hall directly.";
    }

    if (this.state.isSubmitting === true) {
      return "Submitting your booking request. Please wait...";
    }

    if (this.state.bookingAvailabilityState === "loading") {
      return "Checking confirmed booking dates for the selected month...";
    }

    if (!this.state.selectedDate) {
      return "Choose an available date to prepare your request. Pending requests stay open until the Diamond team confirms them.";
    }

    return `Your request will be submitted for ${formatLongDate(this.state.selectedDate)}. Pending requests do not reserve the date until the venue confirms them.`;
  },

  render(state = this.state) {
    if (state) {
      this.state = state;
    }

    if (!this.selectionGrid || !this.selectionSummary || !this.selectionNote) {
      return;
    }

    const cards = [];
    const selectedDateCard = createElement(
      "article",
      `booking-slot booking-slot--static ${this.state.selectedDate ? "is-selected" : "is-disabled"}`
    );
    const selectedDateTitle = createElement(
      "span",
      "booking-slot__time",
      this.state.selectedDate ? formatLongDate(this.state.selectedDate) : "Choose an available date"
    );
    const selectedDateState = createElement(
      "span",
      "booking-slot__state",
      this.state.selectedDate ? "Selected date" : "Awaiting selection"
    );

    selectedDateCard.append(selectedDateTitle, selectedDateState);
    cards.push(selectedDateCard);

    const windowCard = createElement("article", "booking-slot booking-slot--static is-available");
    const windowTitle = createElement(
      "span",
      "booking-slot__time",
      `${FIXED_BOOKING_START} - ${FIXED_BOOKING_END}`
    );
    const windowState = createElement(
      "span",
      "booking-slot__state",
      "Standard request window"
    );

    windowCard.append(windowTitle, windowState);
    cards.push(windowCard);

    this.selectionGrid.replaceChildren(...cards);
    this.selectionSummary.textContent = this.getSummaryText();
    this.selectionNote.textContent = this.getNoteText();
  }
};

const formModule = {
  init(state) {
    this.state = state;
    this.form = document.getElementById("booking-form");
    this.statusElement = document.getElementById("booking-submit-status");
    this.statusElement?.setAttribute("tabindex", "-1");
    this.fields = {
      name: {
        input: document.getElementById("booking-name"),
        error: document.getElementById("booking-name-error")
      },
      phone: {
        input: document.getElementById("booking-phone"),
        error: document.getElementById("booking-phone-error")
      },
      email: {
        input: document.getElementById("booking-email"),
        error: document.getElementById("booking-email-error")
      },
      organisation: {
        input: document.getElementById("booking-organisation"),
        error: document.getElementById("booking-organisation-error")
      },
      eventType: {
        input: document.getElementById("booking-event-type"),
        error: document.getElementById("booking-event-type-error")
      },
      attendees: {
        input: document.getElementById("booking-attendees"),
        error: document.getElementById("booking-attendees-error")
      },
      notes: {
        input: document.getElementById("booking-notes"),
        error: document.getElementById("booking-notes-error")
      }
    };

    this.state.formTouched = {};

    Object.entries(this.fields).forEach(([fieldName, fieldConfig]) => {
      const input = fieldConfig.input;

      if (!input) {
        return;
      }

      const eventName = input.tagName === "SELECT" ? "change" : "input";

      input.addEventListener("blur", () => {
        this.state.formTouched[fieldName] = true;
        this.validateField(fieldName);
      });

      input.addEventListener(eventName, () => {
        if (this.state.formTouched[fieldName]) {
          this.validateField(fieldName);
        }

        if (this.statusElement?.textContent) {
          this.clearStatus();
        }
      });
    });

    this.state.formApi = {
      readValues: () => this.readValues(),
      validateAll: () => this.validateAll(),
      setStatus: (message, tone) => this.setStatus(message, tone),
      clearStatus: () => this.clearStatus(),
      setDisabled: (isDisabled) => this.setDisabled(isDisabled),
      focusStatus: () => this.focusStatus(),
      reset: () => this.reset()
    };
  },

  readValues() {
    return {
      name: normalizeSingleLineInput(this.fields.name.input?.value),
      phone: normalizeSingleLineInput(this.fields.phone.input?.value),
      email: normalizeEmailInput(this.fields.email.input?.value),
      organisation: normalizeSingleLineInput(this.fields.organisation.input?.value),
      eventType: normalizeSingleLineInput(this.fields.eventType.input?.value),
      attendees: normalizeSingleLineInput(this.fields.attendees.input?.value),
      notes: normalizeNotesInput(this.fields.notes.input?.value)
    };
  },

  setFieldError(fieldName, message = "") {
    const field = this.fields[fieldName];

    if (!field?.input || !field?.error) {
      return;
    }

    field.error.textContent = message;
    field.input.setAttribute("aria-invalid", String(Boolean(message)));
  },

  validateField(fieldName) {
    const values = this.readValues();
    let message = "";

    if (fieldName === "name" && !values.name) {
      message = "Please enter your name.";
    }

    if (fieldName === "phone") {
      const digitCount = getPhoneDigitCount(values.phone);

      if (!values.phone) {
        message = "Please enter your phone number.";
      } else if (digitCount !== 10 && digitCount !== 12) {
        message = "Enter a valid phone number.";
      }
    }

    if (fieldName === "email" && values.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(values.email)) {
        message = "Enter a valid email address.";
      }
    }

    if (fieldName === "attendees") {
      const attendeeCount = Number(values.attendees);

      if (!values.attendees) {
        message = "Please enter attendee count.";
      } else if (!Number.isInteger(attendeeCount) || attendeeCount < 1) {
        message = "Attendees must be at least 1.";
      }
    }

    this.setFieldError(fieldName, message);
    return !message;
  },

  validateAll() {
    const fieldNames = ["name", "phone", "email", "attendees"];
    let isValid = true;

    fieldNames.forEach((fieldName) => {
      this.state.formTouched[fieldName] = true;

      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });

    return isValid;
  },

  setStatus(message, tone = "default") {
    if (!this.statusElement) {
      return;
    }

    this.statusElement.textContent = message;
    this.statusElement.dataset.tone = tone;
  },

  clearStatus() {
    if (!this.statusElement) {
      return;
    }

    this.statusElement.textContent = "";
    delete this.statusElement.dataset.tone;
  },

  focusStatus() {
    if (!this.statusElement?.textContent) {
      return;
    }

    this.statusElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
    this.statusElement.focus({ preventScroll: true });
  },

  setDisabled(isDisabled) {
    Object.values(this.fields).forEach((field) => {
      if (field?.input) {
        field.input.disabled = isDisabled;
      }
    });
  },

  reset() {
    this.form?.reset();
    this.clearStatus();
    this.setDisabled(false);

    Object.keys(this.fields).forEach((fieldName) => {
      this.state.formTouched[fieldName] = false;
      this.setFieldError(fieldName, "");
    });
  }
};

const successModule = {
  init(state) {
    this.state = state;
    this.overlay = document.getElementById("booking-success");
    this.resetButton = document.getElementById("booking-reset-button");

    this.resetButton?.addEventListener("click", () => {
      void this.handleReset();
    });

    this.overlay?.addEventListener("click", (event) => {
      if (event.target === this.overlay) {
        void this.handleReset();
      }
    });
  },

  open() {
    if (!this.overlay) {
      return;
    }

    this.overlay.hidden = false;
    this.overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    window.requestAnimationFrame(() => {
      this.overlay.classList.add("is-open");
      this.resetButton?.focus();
    });
  },

  close() {
    if (!this.overlay) {
      return;
    }

    this.overlay.classList.remove("is-open");
    this.overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    window.setTimeout(() => {
      if (!this.overlay?.classList.contains("is-open")) {
        this.overlay.hidden = true;
      }
    }, 240);
  },

  async handleReset() {
    const today = new Date();

    this.close();
    this.state.formApi?.reset?.();
    this.state.selectedDate = null;
    this.state.lastSubmittedBooking = null;
    this.state.currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    selectionModule.render(this.state);
    await calendarModule.loadAvailability();
  }
};

const submitModule = {
  init(state) {
    this.state = state;
    this.form = document.getElementById("booking-form");
    this.submitButton = document.getElementById("booking-submit-button");
    this.submitButtonLabel = this.submitButton?.querySelector(".booking-submit-button__label");
    this.defaultButtonLabel = this.submitButtonLabel?.textContent ?? "Send Booking Request";

    this.form?.addEventListener("submit", (event) => {
      event.preventDefault();
      void this.handleSubmit();
    });

    this.syncAvailabilityState();
  },

  syncAvailabilityState() {
    if (!this.submitButton) {
      return;
    }

    const isSubmitting = this.state.isSubmitting === true;
    const isAvailabilityLoading = this.state.bookingAvailabilityState === "loading";
    const isAvailabilityUnavailable = this.state.bookingAvailabilityState === "unavailable";
    const isHallClosed = this.state.siteSettings.hallStatusOpen === false;
    const hasSelectedDate = Boolean(this.state.selectedDate);

    this.submitButton.disabled =
      isSubmitting ||
      isAvailabilityLoading ||
      isAvailabilityUnavailable ||
      isHallClosed ||
      !hasSelectedDate;

    if (this.submitButtonLabel) {
      if (isSubmitting) {
        this.submitButtonLabel.textContent = "Sending Request...";
      } else if (isAvailabilityLoading) {
        this.submitButtonLabel.textContent = "Loading Availability...";
      } else if (isAvailabilityUnavailable) {
        this.submitButtonLabel.textContent = "Availability Unavailable";
      } else if (isHallClosed) {
        this.submitButtonLabel.textContent = "Bookings Paused";
      } else if (!hasSelectedDate) {
        this.submitButtonLabel.textContent = "Select a Date First";
      } else {
        this.submitButtonLabel.textContent = this.defaultButtonLabel;
      }
    }
  },

  setPendingState(isPending) {
    this.state.isSubmitting = isPending;
    this.form?.setAttribute("aria-busy", String(isPending));
    this.submitButton?.classList.toggle("is-pending", isPending);
    this.state.formApi?.setDisabled?.(isPending);
    calendarModule.render();
    selectionModule.render(this.state);
    this.syncAvailabilityState();
  },

  async handleSubmit() {
    const values = this.state.formApi?.readValues?.() ?? {};
    let whatsappWindow = null;
    let shouldCloseWhatsAppWindow = false;

    if (!this.state.selectedDate) {
      this.state.formApi?.setStatus?.("Choose an available date before submitting.", "error");
      this.state.formApi?.focusStatus?.();
      return;
    }

    if (this.state.siteSettings.hallStatusOpen === false) {
      this.state.formApi?.setStatus?.(
        "Hall bookings are temporarily paused. Please contact Diamond Banquet Hall directly.",
        "error"
      );
      this.state.formApi?.focusStatus?.();
      return;
    }

    if (!this.state.formApi?.validateAll?.()) {
      this.state.formApi?.setStatus?.(
        "Please review the highlighted fields before sending your booking request.",
        "error"
      );
      this.state.formApi?.focusStatus?.();
      return;
    }

    const bookingMessage = buildBookingMessage({
      siteSettings: this.state.siteSettings,
      selectedDate: this.state.selectedDate,
      values
    });
    const whatsappHref = buildWhatsAppLink(this.state.siteSettings.whatsappHref, bookingMessage);

    try {
      whatsappWindow = window.open("", "_blank", "noopener,noreferrer");
      shouldCloseWhatsAppWindow = Boolean(whatsappWindow);
    } catch (_error) {
      whatsappWindow = null;
      shouldCloseWhatsAppWindow = false;
    }

    this.state.formApi?.clearStatus?.();
    this.setPendingState(true);

    try {
      const result = await runWithSingleRetry(() =>
        submitBookingRequest({
          eventDate: this.state.selectedDate,
          customerName: values.name,
          customerPhone: values.phone,
          customerEmail: values.email,
          organisation: values.organisation,
          eventType: values.eventType || "Other",
          attendeeCount: values.attendees,
          notes: values.notes,
          enquiryMessage: values.notes || null
        })
      );

      let notificationWarning = "";

      try {
        await sendBookingAdminNotification({
          customerName: values.name,
          customerPhone: values.phone,
          customerEmail: values.email,
          eventDate: this.state.selectedDate,
          startTime: FIXED_BOOKING_START,
          endTime: FIXED_BOOKING_END,
          eventType: values.eventType || "Other",
          attendeeCount: values.attendees,
          notes: values.notes
        });
      } catch (notificationError) {
        console.warn("Admin email notification failed for booking request.", notificationError);
        notificationWarning = " Admin email notification could not be sent automatically.";
      }

      this.state.lastSubmittedBooking = result.booking;
      await calendarModule.loadAvailability();

      if (whatsappWindow) {
        shouldCloseWhatsAppWindow = false;
        whatsappWindow.location.href = whatsappHref;
      } else {
        window.open(whatsappHref, "_blank", "noopener,noreferrer");
      }

      this.state.formApi?.setStatus?.(
        `Booking request sent. WhatsApp is opening with your booking details.${notificationWarning}`,
        "success"
      );
      successModule.open();
    } catch (error) {
      if (shouldCloseWhatsAppWindow && whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.close();
      }

      this.state.formApi?.setStatus?.(
        describeSupabaseError(error, "Unable to send your booking request right now."),
        "error"
      );
      this.state.formApi?.focusStatus?.();
    } finally {
      if (shouldCloseWhatsAppWindow && whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.close();
      }

      this.setPendingState(false);
    }
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const today = new Date();
  const state = {
    siteSettings: { ...DEFAULT_SITE_SETTINGS },
    currentMonth: new Date(today.getFullYear(), today.getMonth(), 1),
    selectedDate: null,
    bookingAvailabilityState: "loading",
    bookedDateSet: new Set(),
    lastSubmittedBooking: null,
    isSubmitting: false,
    bookingAvailabilityErrorMessage: ""
  };

  const footerYear = document.getElementById("booking-footer-year");

  const applyBrandSettings = () => {
    document.title = `${state.siteSettings.venueName} Booking | ${state.siteSettings.locationLabel}`;

    document.querySelectorAll("[data-brand-text]").forEach((element) => {
      const key = element.dataset.brandText;

      if (key && key in state.siteSettings) {
        element.textContent = state.siteSettings[key];
      }
    });

    document.querySelectorAll("[data-brand-href]").forEach((element) => {
      const key = element.dataset.brandHref;

      if (!key || !(key in state.siteSettings)) {
        return;
      }

      if (element.dataset.whatsappMessage) {
        element.setAttribute(
          "href",
          buildWhatsAppLink(state.siteSettings[key], element.dataset.whatsappMessage)
        );
        return;
      }

      element.setAttribute("href", state.siteSettings[key]);
    });
  };

  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }

  loadingModule.init();
  applyBrandSettings();

  try {
    const { settings } = await runWithSingleRetry(() => fetchSiteSettings());
    state.siteSettings = settings;
    applyBrandSettings();
  } catch (error) {
    console.warn("Default booking page settings are being used.", error);
  }

  selectionModule.init(state);
  calendarModule.init(state);
  formModule.init(state);
  successModule.init(state);
  submitModule.init(state);
});

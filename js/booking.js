import {
  BOOKING_MINIMUM_HOURS,
  BOOKING_SLOT_DEFINITIONS,
  DEFAULT_SITE_SETTINGS,
  buildWhatsAppLink,
  describeSupabaseError,
  fetchBookingAvailabilityWindow,
  fetchSiteSettings,
  sendBookingAdminNotification,
  submitBookingRequest
} from "./site-data.js";

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

const timeStringToMinutes = (timeValue) => {
  const [hour = "0", minute = "0"] = String(timeValue ?? "").split(":");
  return Number(hour) * 60 + Number(minute);
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

const buildBlockedSlotsByDate = (bookingRequests) => {
  const blockedSlotsByDate = new Map();

  bookingRequests.forEach((request) => {
    const blockedSlots = blockedSlotsByDate.get(request.eventDate) ?? new Set();
    const requestStart = timeStringToMinutes(request.startTime);
    const requestEnd = timeStringToMinutes(request.endTime);

    BOOKING_SLOT_DEFINITIONS.forEach((slot) => {
      const slotStart = timeStringToMinutes(slot.start);
      const slotEnd = timeStringToMinutes(slot.end);

      if (requestStart < slotEnd && requestEnd > slotStart) {
        blockedSlots.add(slot.index);
      }
    });

    blockedSlotsByDate.set(request.eventDate, blockedSlots);
  });

  return blockedSlotsByDate;
};

const hasValidSlotWindow = (blockedSlots) => {
  const latestStartIndex = BOOKING_SLOT_DEFINITIONS.length - BOOKING_MINIMUM_HOURS;

  for (let startIndex = 0; startIndex <= latestStartIndex; startIndex += 1) {
    let isWindowOpen = true;

    for (let offset = 0; offset < BOOKING_MINIMUM_HOURS; offset += 1) {
      if (blockedSlots.has(startIndex + offset)) {
        isWindowOpen = false;
        break;
      }
    }

    if (isWindowOpen) {
      return true;
    }
  }

  return false;
};

const getSlotRangeHours = (startIndex, endIndex) => {
  if (!Number.isInteger(startIndex) || !Number.isInteger(endIndex) || endIndex < startIndex) {
    return 0;
  }

  return endIndex - startIndex + 1;
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

const getSelectedSlotDetails = (state) => {
  if (
    !Number.isInteger(state?.selectedSlotStartIndex) ||
    !Number.isInteger(state?.selectedSlotEndIndex)
  ) {
    return null;
  }

  const startSlot = BOOKING_SLOT_DEFINITIONS[state.selectedSlotStartIndex];
  const endSlot = BOOKING_SLOT_DEFINITIONS[state.selectedSlotEndIndex];

  if (!startSlot || !endSlot) {
    return null;
  }

  return {
    startIndex: state.selectedSlotStartIndex,
    endIndex: state.selectedSlotEndIndex,
    startTime: startSlot.start,
    endTime: endSlot.end,
    durationHours: getSlotRangeHours(state.selectedSlotStartIndex, state.selectedSlotEndIndex)
  };
};

const selectionHasSlotConflict = (blockedSlots, slotDetails) => {
  if (!slotDetails) {
    return false;
  }

  for (let slotIndex = slotDetails.startIndex; slotIndex <= slotDetails.endIndex; slotIndex += 1) {
    if (blockedSlots.has(slotIndex)) {
      return true;
    }
  }

  return false;
};

const buildBookingMessage = ({ siteSettings, selectedDate, slotDetails, values }) => {
  const lines = [
    `Hello ${siteSettings.venueName}, I would like to request a booking.`,
    `Date: ${formatLongDate(selectedDate)}`,
    `Time: ${slotDetails.startTime} - ${slotDetails.endTime} (${slotDetails.durationHours} hrs)`,
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
      slotsModule.resetSelection(this.state);
      void this.loadAvailability();
    });

    this.calendarNext?.addEventListener("click", () => {
      this.state.currentMonth = new Date(
        this.state.currentMonth.getFullYear(),
        this.state.currentMonth.getMonth() + 1,
        1
      );
      this.state.selectedDate = null;
      slotsModule.resetSelection(this.state);
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

    const blockedSlots = this.state.blockedSlotsByDate.get(dateKey) ?? new Set();

    if (!blockedSlots.size) {
      return "available";
    }

    return hasValidSlotWindow(blockedSlots) ? "partial" : "booked";
  },

  getCalendarMessage() {
    if (this.state.siteSettings.hallStatusOpen === false) {
      return "Hall bookings are temporarily paused. Please call or WhatsApp the Diamond team for updates.";
    }

    if (this.state.bookingAvailabilityState === "loading") {
      return "Loading live availability...";
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
      this.state.bookingRequests = result.bookingRequests;
      this.state.blockedSlotsByDate = buildBlockedSlotsByDate(result.bookingRequests);
      this.state.bookingAvailabilityErrorMessage = "";
      this.state.bookingAvailabilityState = "ready";
      this.render();
    } catch (error) {
      if (activeRequest !== this.requestSequence) {
        return;
      }

      this.state.bookedDateSet = new Set();
      this.state.bookingRequests = [];
      this.state.blockedSlotsByDate = new Map();
      this.state.selectedDate = null;
      slotsModule.resetSelection(this.state);
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
        meta.textContent = "Full";
      } else if (dayState === "partial") {
        button.classList.add("is-partial");
        indicator.classList.add("booking-calendar-day__indicator--partial");
        meta.textContent = "Partial";
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
        `${dayState === "unavailable" ? "Live availability unavailable for" : dayState === "booked" ? "Fully booked" : dayState === "partial" ? "Partially booked" : "Available"} ${formatLongDate(cellKey)}`
      );

      if (!isSelectable) {
        button.disabled = true;
      } else {
        button.addEventListener("click", () => {
          this.state.selectedDate = cellKey;
          slotsModule.resetSelection(this.state);
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
    slotsModule.render(this.state);
    submitModule.syncAvailabilityState?.();
  }
};

const slotsModule = {
  init(state) {
    this.state = state;
    this.slotGrid = document.getElementById("booking-slot-grid");
    this.slotSummary = document.getElementById("booking-slot-summary");
    this.slotNote = document.getElementById("booking-slot-note");
    this.render();
  },

  resetSelection(state = this.state) {
    if (!state) {
      return;
    }

    state.selectedSlotStartIndex = null;
    state.selectedSlotEndIndex = null;
  },

  getBlockedSlots() {
    if (!this.state?.selectedDate) {
      return new Set();
    }

    return this.state.blockedSlotsByDate.get(this.state.selectedDate) ?? new Set();
  },

  canStartAt(slotIndex) {
    if (
      !this.state?.selectedDate ||
      this.state.siteSettings.hallStatusOpen === false ||
      this.state.isSubmitting === true ||
      this.state.bookingAvailabilityState !== "ready"
    ) {
      return false;
    }

    const latestStartIndex = BOOKING_SLOT_DEFINITIONS.length - BOOKING_MINIMUM_HOURS;

    if (slotIndex < 0 || slotIndex > latestStartIndex) {
      return false;
    }

    const blockedSlots = this.getBlockedSlots();

    for (let index = slotIndex; index < slotIndex + BOOKING_MINIMUM_HOURS; index += 1) {
      if (blockedSlots.has(index)) {
        return false;
      }
    }

    return true;
  },

  canExtendTo(slotIndex) {
    if (
      !Number.isInteger(this.state?.selectedSlotStartIndex) ||
      !Number.isInteger(this.state?.selectedSlotEndIndex) ||
      this.state.isSubmitting === true ||
      this.state.bookingAvailabilityState !== "ready"
    ) {
      return false;
    }

    if (slotIndex <= this.state.selectedSlotEndIndex || slotIndex >= BOOKING_SLOT_DEFINITIONS.length) {
      return false;
    }

    const blockedSlots = this.getBlockedSlots();

    for (let index = this.state.selectedSlotEndIndex + 1; index <= slotIndex; index += 1) {
      if (blockedSlots.has(index)) {
        return false;
      }
    }

    return true;
  },

  setSelectionFromStart(slotIndex) {
    this.state.selectedSlotStartIndex = slotIndex;
    this.state.selectedSlotEndIndex = slotIndex + BOOKING_MINIMUM_HOURS - 1;
  },

  extendSelectionTo(slotIndex) {
    this.state.selectedSlotEndIndex = slotIndex;
  },

  getSummaryText() {
    const startIndex = this.state?.selectedSlotStartIndex;
    const endIndex = this.state?.selectedSlotEndIndex;

    if (!Number.isInteger(startIndex) || !Number.isInteger(endIndex)) {
      return "Selected: --:-- \u2013 --:-- (0 hrs)";
    }

    const startSlot = BOOKING_SLOT_DEFINITIONS[startIndex];
    const endSlot = BOOKING_SLOT_DEFINITIONS[endIndex];
    const durationHours = getSlotRangeHours(startIndex, endIndex);

    return `Selected: ${startSlot.start} \u2013 ${endSlot.end} (${durationHours} hrs)`;
  },

  getNoteText() {
    if (this.state.bookingAvailabilityState === "unavailable") {
      return "Live availability is temporarily unavailable. Please retry or contact Diamond Banquet Hall directly.";
    }

    if (!this.state?.selectedDate) {
      return "Choose an available date to unlock the 06:00 to 12:00 slot window.";
    }

    if (this.state.isSubmitting === true) {
      return "Submitting your booking request. Please wait...";
    }

    if (this.state.siteSettings.hallStatusOpen === false) {
      return "Hall bookings are temporarily paused. Please contact Diamond Banquet Hall directly.";
    }

    if (this.state.bookingAvailabilityState === "loading") {
      return "Checking open time slots for the selected date...";
    }

    if (
      Number.isInteger(this.state.selectedSlotStartIndex) &&
      Number.isInteger(this.state.selectedSlotEndIndex)
    ) {
      return "Minimum 4 hours selected. Click a later free slot to extend your booking up to 12:00.";
    }

    return `Selected date: ${formatLongDate(
      this.state.selectedDate
    )}. Click a start time to auto-select your minimum 4-hour booking.`;
  },

  handleSlotClick(slotIndex) {
    if (this.canExtendTo(slotIndex)) {
      this.extendSelectionTo(slotIndex);
      this.render();
      return;
    }

    if (this.canStartAt(slotIndex)) {
      this.setSelectionFromStart(slotIndex);
      this.render();
    }
  },

  render(state = this.state) {
    if (state) {
      this.state = state;
    }

    if (!this.slotGrid || !this.slotSummary || !this.slotNote) {
      return;
    }

    const blockedSlots = this.getBlockedSlots();
    const latestStartIndex = BOOKING_SLOT_DEFINITIONS.length - BOOKING_MINIMUM_HOURS;
    const selectedStartIndex = this.state.selectedSlotStartIndex;
    const selectedEndIndex = this.state.selectedSlotEndIndex;
    const slotButtons = BOOKING_SLOT_DEFINITIONS.map((slot) => {
      const button = createElement("button", "booking-slot");
      const slotTime = createElement("span", "booking-slot__time", slot.label);
      const slotState = createElement("span", "booking-slot__state");
      const isBlocked = blockedSlots.has(slot.index);
      const isSelected =
        Number.isInteger(selectedStartIndex) &&
        Number.isInteger(selectedEndIndex) &&
        slot.index >= selectedStartIndex &&
        slot.index <= selectedEndIndex;
      const canStart = this.canStartAt(slot.index);
      const canExtend = this.canExtendTo(slot.index);
      const isInteractive = isSelected || canStart || canExtend;

      button.type = "button";
      button.dataset.slotIndex = String(slot.index);

      if (isBlocked) {
        button.classList.add("is-blocked");
        slotState.textContent = "Booked";
        button.disabled = true;
        button.title = "This slot is already booked.";
      } else if (isSelected) {
        button.classList.add("is-selected");
        slotState.textContent = "Selected";
        button.addEventListener("click", () => this.handleSlotClick(slot.index));
      } else if (canExtend) {
        button.classList.add("is-extendable");
        slotState.textContent = "Extend";
        button.addEventListener("click", () => this.handleSlotClick(slot.index));
      } else if (canStart) {
        button.classList.add("is-available");
        slotState.textContent = slot.index <= latestStartIndex ? "Start" : "Open";
        button.addEventListener("click", () => this.handleSlotClick(slot.index));
      } else {
        button.classList.add("is-disabled");

        if (!this.state.selectedDate) {
          slotState.textContent = "Pick date";
        } else if (this.state.bookingAvailabilityState === "unavailable") {
          slotState.textContent = "Offline";
        } else if (this.state.siteSettings.hallStatusOpen === false) {
          slotState.textContent = "Paused";
        } else if (slot.index > latestStartIndex && !Number.isInteger(selectedStartIndex)) {
          slotState.textContent = "Need 4 hrs";
        } else {
          slotState.textContent = "Unavailable";
        }

        button.disabled = true;
      }

      if (!isInteractive && !button.disabled) {
        button.disabled = true;
      }

      button.append(slotTime, slotState);
      return button;
    });

    this.slotGrid.replaceChildren(...slotButtons);
    this.slotSummary.textContent = this.getSummaryText();
    this.slotNote.textContent = this.getNoteText();
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
      validateField: (fieldName) => this.validateField(fieldName),
      validateAll: () => this.validateAll(),
      setStatus: (message, tone) => this.setStatus(message, tone),
      clearStatus: () => this.clearStatus(),
      setDisabled: (isDisabled) => this.setDisabled(isDisabled),
      focusStatus: () => this.focusStatus()
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
    this.state.selectedSlotStartIndex = null;
    this.state.selectedSlotEndIndex = null;
    this.state.lastSubmittedBooking = null;
    this.state.currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

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

    this.submitButton.disabled = isSubmitting || isAvailabilityLoading || isAvailabilityUnavailable;

    if (this.submitButtonLabel) {
      if (isSubmitting) {
        this.submitButtonLabel.textContent = "Sending Request...";
      } else if (isAvailabilityLoading) {
        this.submitButtonLabel.textContent = "Loading Availability...";
      } else if (isAvailabilityUnavailable) {
        this.submitButtonLabel.textContent = "Availability Unavailable";
      } else {
        this.submitButtonLabel.textContent = this.defaultButtonLabel;
      }
    }
  },

  setPendingState(isPending) {
    this.state.isSubmitting = isPending;
    this.state.formApi?.setDisabled?.(isPending);
    this.form?.setAttribute("aria-busy", String(isPending));

    if (!this.submitButton) {
      calendarModule.render();
      return;
    }

    this.submitButton.classList.toggle("is-pending", isPending);
    this.syncAvailabilityState();

    calendarModule.render();
  },

  async handleSubmit() {
    const isValid = this.state.formApi?.validateAll?.() ?? false;
    const slotDetails = getSelectedSlotDetails(this.state);

    if (!this.state.selectedDate) {
      this.state.formApi?.setStatus?.("Please choose an available date.", "error");
      this.state.formApi?.focusStatus?.();
      return;
    }

    if (!slotDetails) {
      this.state.formApi?.setStatus?.("Please choose your booking time slots.", "error");
      this.state.formApi?.focusStatus?.();
      return;
    }

    if (!isValid) {
      this.state.formApi?.setStatus?.("Please correct the highlighted fields.", "error");
      this.state.formApi?.focusStatus?.();
      return;
    }

    const values = this.state.formApi?.readValues?.() ?? {};
    const message = buildBookingMessage({
      siteSettings: this.state.siteSettings,
      selectedDate: this.state.selectedDate,
      slotDetails,
      values
    });
    const whatsappHref = buildWhatsAppLink(this.state.siteSettings.whatsappHref, message);
    const whatsappWindow = window.open("", "_blank");
    let shouldCloseWhatsAppWindow = true;

    if (whatsappWindow) {
      whatsappWindow.opener = null;
    }

    this.setPendingState(true);
    this.state.formApi?.setStatus?.("Checking your slot and sending your request...", "default");

    try {
      const latestAvailability = await runWithSingleRetry(() =>
        fetchBookingAvailabilityWindow({
          startDate: this.state.selectedDate,
          endDate: this.state.selectedDate
        })
      );
      const latestBookedDateSet = new Set(latestAvailability.bookedDates);
      const latestBlockedSlotsByDate = buildBlockedSlotsByDate(latestAvailability.bookingRequests);
      const latestBlockedSlots = latestBlockedSlotsByDate.get(this.state.selectedDate) ?? new Set();
      const hasFreshConflict =
        latestBookedDateSet.has(this.state.selectedDate) ||
        selectionHasSlotConflict(latestBlockedSlots, slotDetails);

      if (hasFreshConflict) {
        this.state.bookedDateSet = latestBookedDateSet;
        this.state.bookingRequests = latestAvailability.bookingRequests;
        this.state.blockedSlotsByDate = latestBlockedSlotsByDate;
        slotsModule.resetSelection(this.state);
        calendarModule.render();
        this.state.formApi?.setStatus?.(
          "That slot was just booked. Please choose a different time.",
          "error"
        );
        this.state.formApi?.focusStatus?.();
        return;
      }

      const result = await submitBookingRequest({
        eventDate: this.state.selectedDate,
        startTime: slotDetails.startTime,
        endTime: slotDetails.endTime,
        customerName: values.name,
        customerPhone: values.phone,
        customerEmail: values.email,
        organisation: values.organisation,
        eventType: values.eventType || "Other",
        attendeeCount: values.attendees,
        notes: values.notes,
        enquiryMessage: message
      });
      let notificationWarning = "";

      try {
        await sendBookingAdminNotification({
          customerName: values.name,
          customerPhone: values.phone,
          customerEmail: values.email,
          eventDate: this.state.selectedDate,
          startTime: slotDetails.startTime,
          endTime: slotDetails.endTime,
          eventType: values.eventType || "Other",
          attendeeCount: values.attendees,
          notes: values.notes
        });
      } catch (notificationError) {
        console.warn("Admin email notification failed for booking request.", notificationError);
        notificationWarning = " Admin email notification could not be sent automatically.";
      }

      this.state.lastSubmittedBooking = result.bookingRequest;
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
    selectedSlotStartIndex: null,
    selectedSlotEndIndex: null,
    bookingAvailabilityState: "loading",
    bookedDateSet: new Set(),
    bookingRequests: [],
    blockedSlotsByDate: new Map(),
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

  slotsModule.init(state);
  calendarModule.init(state);
  formModule.init(state);
  successModule.init(state);
  submitModule.init(state);
});

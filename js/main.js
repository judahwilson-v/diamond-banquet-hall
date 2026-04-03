const FALLBACK_SITE_SETTINGS = {
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
const WEBSITE_URL = "__SITE_URL__";

const fallbackWhatsAppLink = (baseHref, message) => {
  if (!message) {
    return baseHref;
  }

  const separator = baseHref.includes("?") ? "&" : "?";
  return `${baseHref}${separator}text=${encodeURIComponent(message)}`;
};

document.addEventListener("DOMContentLoaded", async () => {
  let DEFAULT_SITE_SETTINGS = { ...FALLBACK_SITE_SETTINGS };
  let buildWhatsAppLink = fallbackWhatsAppLink;
  let fetchBookedDates = async () => [];
  let fetchReviews = async () => ({
    reviews: [],
    source: "fallback",
    warning: null
  });
  let fetchGalleryAssets = async () => [];
  let fetchSiteSettings = async () => ({
    settings: { ...FALLBACK_SITE_SETTINGS },
    schema: null
  });
  let subscribeToVenueUpdates = () => () => {};

  try {
    const siteData = await import("./site-data.js");
    DEFAULT_SITE_SETTINGS = siteData.DEFAULT_SITE_SETTINGS;
    buildWhatsAppLink = siteData.buildWhatsAppLink;
    fetchBookedDates = siteData.fetchBookedDates;
    fetchReviews = siteData.fetchReviews;
    fetchGalleryAssets = siteData.fetchGalleryAssets ?? fetchGalleryAssets;
    fetchSiteSettings = siteData.fetchSiteSettings;
    subscribeToVenueUpdates = siteData.subscribeToVenueUpdates;
  } catch (error) {
    console.warn("Supabase modules failed to load. Rendering the site with safe fallback data.", error);
  }

  const siteHeader = document.querySelector(".site-header");
  const navLinks = Array.from(document.querySelectorAll(".site-nav__links a"));
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const calendarModal = document.getElementById("calendar-modal");
  const calendarDialog = calendarModal?.querySelector(".calendar-modal__dialog");
  const calendarClose = document.getElementById("calendar-close");
  const calendarLabel = document.getElementById("calendar-month-label");
  const calendarDays = document.getElementById("calendar-days");
  const calendarPrev = document.getElementById("calendar-prev");
  const calendarNext = document.getElementById("calendar-next");
  const calendarSelectedDate = document.getElementById("calendar-selected-date");
  const calendarWhatsAppLink = document.getElementById("calendar-whatsapp-link");
  const calendarCallLink = document.getElementById("calendar-call-link");
  const lightbox = document.getElementById("lightbox");
  const lightboxStage = lightbox?.querySelector(".lightbox__stage");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const faqButtons = document.querySelectorAll(".faq-item__button");
  const reviewsTrack = document.getElementById("reviews-track");
  const reviewLink = document.getElementById("reviews-link");
  const revealTargets = document.querySelectorAll("[data-reveal]");
  const floatingContactBar = document.querySelector(".floating-contact-bar");
  const openCalendarButtons = document.querySelectorAll("[data-open-calendar]");
  const galleryContainer = document.querySelector(".gallery-masonry");
  let galleryTriggers = Array.from(document.querySelectorAll("[data-gallery-item]"));
  const cursorLayer = document.querySelector(".luxury-cursor");
  const cursorDot = cursorLayer?.querySelector(".luxury-cursor__dot");
  const cursorRing = cursorLayer?.querySelector(".luxury-cursor__ring");
  const interactiveTargets = Array.from(document.querySelectorAll("a, button"));
  let baseViewportHeight = window.innerHeight;
  let unsubscribeLiveData = null;
  let refreshTimer = null;

  const state = {
    siteSettings: { ...DEFAULT_SITE_SETTINGS },
    bookedDateSet: new Set(),
    bookingAvailabilityState: "loading",
    reviews: [],
    galleryItems: [],
    currentMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    selectedDate: null,
    lightboxIndex: 0,
    lastCalendarTrigger: null,
    lastLightboxTrigger: null,
    lastDynamicRefreshAt: 0
  };

  const setVisibility = (element, hidden) => {
    if (!element) {
      return;
    }

    element.hidden = hidden;
    element.setAttribute("aria-hidden", String(hidden));

    if (element === calendarModal || element === lightbox || element === mobileMenu) {
      element.classList.toggle("is-open", !hidden);
    }
  };

  const syncBodyState = () => {
    const hasOpenModal = Boolean(calendarModal && !calendarModal.hidden) || Boolean(lightbox && !lightbox.hidden);
    const hasOpenMenu = mobileMenu && !mobileMenu.hidden;
    document.body.classList.toggle("modal-open", hasOpenModal);
    document.body.classList.toggle("menu-open", Boolean(hasOpenMenu));
  };

  const getFocusableElements = (container) => {
    if (!container) {
      return [];
    }

    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.hasAttribute("hidden"));
  };

  const getActiveFocusScope = () => {
    if (lightbox && !lightbox.hidden && lightboxStage) {
      return lightboxStage;
    }

    if (calendarModal && !calendarModal.hidden && calendarDialog) {
      return calendarDialog;
    }

    if (mobileMenu && !mobileMenu.hidden) {
      return mobileMenu;
    }

    return null;
  };

  const trapFocus = (event) => {
    if (event.key !== "Tab") {
      return;
    }

    const scope = getActiveFocusScope();
    const focusable = getFocusableElements(scope);

    if (!scope || !focusable.length) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatLongDate = (dateKey) =>
    new Date(`${dateKey}T00:00:00`).toLocaleDateString("en-IN", {
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

  const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

  const buildPageTitle = () =>
    `${state.siteSettings.venueName} in ${state.siteSettings.locationLabel} | Wedding & Event Venue`;

  const buildMarketingDescription = () =>
    `${state.siteSettings.venueName} is an AC wedding and event venue in ${state.siteSettings.locationLabel}, Kerala with space for 250 guests, ${state.siteSettings.roomCount} AC rooms, parking, and direct WhatsApp booking.`;

  const buildVenueStructuredData = () => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${WEBSITE_URL}/#website`,
        url: `${WEBSITE_URL}/`,
        name: state.siteSettings.venueName,
        alternateName: state.siteSettings.shortName,
        inLanguage: "en-IN"
      },
      {
        "@type": "EventVenue",
        "@id": `${WEBSITE_URL}/#venue`,
        name: state.siteSettings.venueName,
        url: `${WEBSITE_URL}/`,
        description: `AC wedding and event venue in ${state.siteSettings.locationLabel}, Kerala for weddings, receptions, engagements, and corporate events.`,
        image: [
          `${WEBSITE_URL}/images/hero.jpg`,
          `${WEBSITE_URL}/images/hall1.jpg`,
          `${WEBSITE_URL}/images/hall2.jpg`,
          `${WEBSITE_URL}/images/hall3.jpg`
        ],
        telephone: state.siteSettings.phoneDisplay,
        priceRange: "₹₹",
        hasMap: state.siteSettings.mapsHref,
        geo: {
          "@type": "GeoCoordinates",
          latitude: 10.0977488,
          longitude: 76.4719763
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: state.siteSettings.addressLine1,
          addressLocality: "Perumbavoor",
          addressRegion: "Kerala",
          postalCode: "683556",
          addressCountry: "IN"
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            opens: "09:00",
            closes: "21:00"
          }
        ],
        amenityFeature: [
          {
            "@type": "LocationFeatureSpecification",
            name: "Fully air-conditioned banquet hall",
            value: true
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Guest rooms",
            value: true
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Valet parking",
            value: true
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Power backup",
            value: true
          }
        ],
        sameAs: [state.siteSettings.instagramHref, state.siteSettings.mapsHref]
      }
    ]
  });

  const extractGalleryItem = (item, index) => {
    const image = item.querySelector("img");

    return {
      id: item.dataset.galleryId || `local-gallery-${index + 1}`,
      path: item.dataset.galleryPath || image?.getAttribute("src") || "",
      src: item.dataset.lightboxSrc || image?.getAttribute("src") || "",
      alt:
        item.dataset.lightboxAlt ||
        image?.getAttribute("alt") ||
        `Diamond Banquet Hall gallery image ${index + 1}`
    };
  };

  const fallbackGalleryItems = galleryTriggers.map(extractGalleryItem);

  const applyBrandSettings = () => {
    document.title = buildPageTitle();
    document.documentElement.lang = "en-IN";

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", buildMarketingDescription());
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", buildPageTitle());
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", buildMarketingDescription());
    document
      .querySelector('meta[property="og:site_name"]')
      ?.setAttribute("content", state.siteSettings.venueName);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", buildPageTitle());
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", buildMarketingDescription());

    document.querySelectorAll("[data-brand-text]").forEach((element) => {
      const key = element.dataset.brandText;

      if (key in state.siteSettings) {
        element.textContent = state.siteSettings[key];
      }
    });

    document.querySelectorAll("[data-brand-html]").forEach((element) => {
      const key = element.dataset.brandHtml;

      if (key === "roomPrice") {
        element.textContent = `₹${Number(state.siteSettings.roomPrice).toLocaleString("en-IN")} / night`;
      }

      if (key === "hallPriceAmount") {
        element.textContent = `₹${Number(state.siteSettings.hallPrice).toLocaleString("en-IN")}`;
      }

      if (key === "roomPriceAmount") {
        element.textContent = `₹${Number(state.siteSettings.roomPrice).toLocaleString("en-IN")}`;
      }

      if (key === "roomSummary") {
        element.textContent = `${state.siteSettings.roomCount} air-conditioned rooms for your guests`;
      }

      if (key === "roomAvailabilityLine") {
        element.textContent = `${state.siteSettings.roomCount} AC rooms available`;
      }

      if (key === "hallFeatureChip") {
        element.textContent = `250 Guests · Full AC · ${formatCurrency(state.siteSettings.hallPrice)} / 4 hrs`;
      }
    });

    document.querySelectorAll("[data-brand-href]").forEach((element) => {
      const key = element.dataset.brandHref;

      if (key in state.siteSettings) {
        element.setAttribute("href", state.siteSettings[key]);
      }
    });

    document.querySelectorAll("[data-whatsapp-message]").forEach((element) => {
      const message = element.dataset.whatsappMessage;
      element.setAttribute("href", buildWhatsAppLink(state.siteSettings.whatsappHref, message));
    });

    if (reviewLink) {
      reviewLink.href = state.siteSettings.mapsHref;
    }

    if (calendarCallLink) {
      calendarCallLink.href = state.siteSettings.phoneHref;
    }

    const structuredDataNode = document.getElementById("venue-structured-data");

    if (structuredDataNode) {
      structuredDataNode.textContent = JSON.stringify(buildVenueStructuredData(), null, 2);
    }

    const footerYear = document.getElementById("site-footer-year");

    if (footerYear) {
      footerYear.textContent = String(new Date().getFullYear());
    }
  };

  const buildReviewCard = (review) => {
    const article = createElement("article", "review-card");
    const stars = createElement("p", "review-card__stars", "★★★★★");
    const text = createElement("p", "review-card__text", review.text);
    const meta = createElement("div", "review-card__meta");
    const name = createElement("span", "review-card__name", review.name);
    const event = createElement(
      "span",
      "review-card__event",
      `${review.event} · ${review.date}`
    );

    stars.setAttribute("aria-label", "5 out of 5 stars");
    meta.append(name, event);
    article.append(stars, text, meta);
    return article;
  };

  const renderReviews = () => {
    if (!reviewsTrack) {
      return;
    }

    if (!state.reviews.length) {
      const placeholder = buildReviewCard({
        name: "Diamond Banquet Hall",
        event: "Guest Experiences",
        date: "Live",
        text: "Customer reviews will appear here once they are added to the live reviews table."
      });
      reviewsTrack.replaceChildren(placeholder);
      return;
    }

    reviewsTrack.replaceChildren(...state.reviews.map(buildReviewCard));
  };

  const getGalleryVariantClass = (index) => {
    if (index % 5 === 0) {
      return "gallery-item--featured";
    }

    if (index % 3 === 1) {
      return "gallery-item--portrait";
    }

    return "gallery-item--standard";
  };

  const renderGallery = (items = fallbackGalleryItems) => {
    if (!galleryContainer) {
      return;
    }

    const safeItems = Array.isArray(items) && items.length ? items : fallbackGalleryItems;
    const nextNodes = safeItems.map((item, index) => {
      const button = createElement("button", `gallery-item ${getGalleryVariantClass(index)}`);
      const image = createElement("img");

      button.type = "button";
      button.dataset.galleryItem = "";
      button.dataset.galleryId = item.id ?? `gallery-${index + 1}`;
      button.dataset.galleryPath = item.path ?? "";
      button.dataset.lightboxSrc = item.src;
      button.dataset.lightboxAlt = item.alt;
      button.setAttribute("aria-label", `Open gallery image ${index + 1}`);

      image.src = item.src;
      image.alt = item.alt;
      image.loading = "lazy";
      button.append(image);

      return button;
    });

    galleryContainer.replaceChildren(...nextNodes);
    galleryTriggers = Array.from(galleryContainer.querySelectorAll("[data-gallery-item]"));

    galleryTriggers.forEach((item, index) => {
      item.addEventListener("click", () => openLightbox(index));
    });
  };

  const updateCalendarSelection = () => {
    const hallBookingsPaused = state.siteSettings.hallStatusOpen === false;
    const availabilityReady = state.bookingAvailabilityState === "ready";
    const availabilityUnavailable =
      state.bookingAvailabilityState === "error" || state.bookingAvailabilityState === "stale";
    const message = hallBookingsPaused
      ? "Hello Diamond Banquet Hall, I would like to ask when hall bookings will reopen."
      : state.selectedDate
        ? `Hello Diamond Banquet Hall, I would like to enquire about ${formatLongDate(
            state.selectedDate
          )} for the banquet hall.`
        : "Hello Diamond Banquet Hall, I would like to enquire about hall availability and pricing.";

    if (calendarSelectedDate) {
      if (hallBookingsPaused) {
        calendarSelectedDate.textContent =
          "Hall bookings are temporarily paused. Please call or WhatsApp us for updates.";
      } else if (!availabilityReady) {
        calendarSelectedDate.textContent =
          availabilityUnavailable
            ? "Live availability is temporarily unavailable. Please call or WhatsApp us to confirm your date."
            : "Loading live availability...";
      } else {
        calendarSelectedDate.textContent = state.selectedDate
          ? `Selected date: ${formatLongDate(state.selectedDate)}`
          : "Select an available future date to prepare your enquiry.";
      }
    }

    if (calendarWhatsAppLink) {
      calendarWhatsAppLink.href = buildWhatsAppLink(state.siteSettings.whatsappHref, message);
    }
  };

  const renderCalendar = () => {
    if (!calendarLabel || !calendarDays) {
      return;
    }

    const today = new Date();
    const todayFloor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const year = state.currentMonth.getFullYear();
    const month = state.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const leadingDays = firstDay.getDay();
    const totalCells = Math.ceil((leadingDays + lastDay.getDate()) / 7) * 7;
    const dayButtons = [];
    const availabilityReady = state.bookingAvailabilityState === "ready";
    const hallBookingsPaused = state.siteSettings.hallStatusOpen === false;

    calendarLabel.textContent = state.currentMonth.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric"
    });

    for (let cell = 0; cell < totalCells; cell += 1) {
      const cellDate = new Date(year, month, cell - leadingDays + 1);
      const cellKey = formatDateKey(cellDate);
      const isCurrentMonth = cellDate.getMonth() === month;
      const isToday = cellDate.getTime() === todayFloor.getTime();
      const isPast = cellDate < todayFloor;
      const isBooked = state.bookedDateSet.has(cellKey);
      const isSelectable =
        availabilityReady && !hallBookingsPaused && isCurrentMonth && !isPast && !isBooked;
      const button = createElement("button", "calendar-day");
      const availabilityLabel = isBooked
        ? "Booked"
        : hallBookingsPaused && isCurrentMonth && !isPast
          ? "Unavailable"
          : !availabilityReady && isCurrentMonth && !isPast
            ? "Availability unavailable"
            : isSelectable
              ? "Available"
              : "Unavailable";

      button.type = "button";
      button.dataset.date = cellKey;
      button.textContent = String(cellDate.getDate());
      button.setAttribute("aria-label", `${availabilityLabel} ${formatLongDate(cellKey)}`);

      if (!isCurrentMonth) {
        button.classList.add("is-outside");
      }

      if (isToday) {
        button.classList.add("is-today");
      }

      if (isPast && isCurrentMonth) {
        button.classList.add("is-past");
      }

      if (isBooked) {
        button.classList.add("is-booked");
        button.disabled = true;
        button.title = "Booked";
      } else if (!isSelectable) {
        button.disabled = true;
        if (hallBookingsPaused && isCurrentMonth && !isPast) {
          button.title = "Bookings are temporarily paused";
        } else if (!availabilityReady && isCurrentMonth && !isPast) {
          button.title = "Live availability is temporarily unavailable";
        }
      } else {
        button.classList.add("is-available");
        button.addEventListener("click", () => {
          state.selectedDate = cellKey;
          renderCalendar();
          updateCalendarSelection();
        });
      }

      if (state.selectedDate === cellKey) {
        button.classList.add("is-selected");
        button.setAttribute("aria-pressed", "true");
      }

      dayButtons.push(button);
    }

    calendarDays.replaceChildren(...dayButtons);
  };

  const closeMobileMenu = () => {
    if (!mobileMenu || !navToggle) {
      return;
    }

    setVisibility(mobileMenu, true);
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
    syncBodyState();
  };

  const toggleMobileMenu = () => {
    if (!mobileMenu || !navToggle) {
      return;
    }

    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setVisibility(mobileMenu, isOpen);
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    syncBodyState();

    if (!isOpen) {
      getFocusableElements(mobileMenu)[0]?.focus();
    }
  };

  const openModal = (event) => {
    if (!calendarModal) {
      return;
    }

    state.lastCalendarTrigger = event?.currentTarget ?? document.activeElement;
    state.selectedDate = null;
    setVisibility(calendarModal, false);
    updateCalendarSelection();
    renderCalendar();
    syncBodyState();
    calendarClose?.focus();
    void refreshDynamicData(true);
  };

  const closeCalendar = () => {
    if (!calendarModal) {
      return;
    }

    setVisibility(calendarModal, true);
    syncBodyState();

    if (state.lastCalendarTrigger instanceof HTMLElement) {
      state.lastCalendarTrigger.focus();
    }
  };

  const openLightbox = (index) => {
    const item = galleryTriggers[index];

    if (!item || !lightbox || !lightboxImage) {
      return;
    }

    state.lastLightboxTrigger = item;
    state.lightboxIndex = index;
    setVisibility(lightbox, false);
    syncBodyState();
    lightboxImage.src = item.dataset.lightboxSrc || "";
    lightboxImage.alt = item.dataset.lightboxAlt || "";

    if (lightboxCaption) {
      lightboxCaption.textContent = item.dataset.lightboxAlt || "";
    }

    lightboxClose?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) {
      return;
    }

    setVisibility(lightbox, true);
    lightboxImage.src = "";
    lightboxImage.alt = "";

    if (lightboxCaption) {
      lightboxCaption.textContent = "";
    }

    syncBodyState();

    if (state.lastLightboxTrigger instanceof HTMLElement) {
      state.lastLightboxTrigger.focus();
    }
  };

  const stepLightbox = (direction) => {
    if (!galleryTriggers.length) {
      return;
    }

    state.lightboxIndex =
      (state.lightboxIndex + direction + galleryTriggers.length) % galleryTriggers.length;
    openLightbox(state.lightboxIndex);
  };

  const toggleHeader = () => {
    if (!siteHeader) {
      return;
    }

    siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const handleReveal = () => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, revealObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15
      }
    );

    revealTargets.forEach((target) => observer.observe(target));
  };

  const initializeMagneticHover = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    navLinks.forEach((link) => {
      const resetTransform = () => {
        link.style.transform = "translate3d(0, 0, 0)";
      };

      link.addEventListener("pointermove", (event) => {
        const rect = link.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (event.clientX - centerX) * 0.18;
        const offsetY = (event.clientY - centerY) * 0.18;
        const translateX = Math.max(-15, Math.min(15, offsetX));
        const translateY = Math.max(-15, Math.min(15, offsetY));

        link.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
      });

      link.addEventListener("pointerleave", resetTransform);
      link.addEventListener("blur", resetTransform);
    });
  };

  const initializeCustomCursor = () => {
    if (!cursorLayer || !cursorDot || !cursorRing) {
      return;
    }

    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!finePointerQuery.matches) {
      cursorLayer.remove();
      return;
    }

    document.body.classList.add("has-custom-cursor");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;

    const renderCursor = () => {
      ringX += (pointerX - ringX) * 0.18;
      ringY += (pointerY - ringY) * 0.18;

      cursorDot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      window.requestAnimationFrame(renderCursor);
    };

    window.requestAnimationFrame(renderCursor);

    window.addEventListener("pointermove", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursorLayer.classList.add("is-visible");
    });

    window.addEventListener("pointerdown", () => {
      cursorLayer.classList.add("is-pressed");
    });

    window.addEventListener("pointerup", () => {
      cursorLayer.classList.remove("is-pressed");
    });

    window.addEventListener("pointercancel", () => {
      cursorLayer.classList.remove("is-pressed");
    });

    document.addEventListener("mouseout", (event) => {
      if (!event.relatedTarget) {
        cursorLayer.classList.remove("is-visible");
      }
    });

    interactiveTargets.forEach((element) => {
      element.addEventListener("pointerenter", () => {
        cursorLayer.classList.add("is-hovering");
      });

      element.addEventListener("pointerleave", () => {
        cursorLayer.classList.remove("is-hovering");
      });
    });
  };

  const initializeFaq = () => {
    faqButtons.forEach((button, index) => {
      const item = button.closest(".faq-item");
      const panel = item?.querySelector(".faq-item__panel");
      const panelId = `faq-panel-${index + 1}`;

      if (panel) {
        panel.id = panelId;
        panel.setAttribute("aria-hidden", String(!item?.classList.contains("is-open")));
      }

      button.setAttribute("aria-controls", panelId);

      button.addEventListener("click", () => {
        const isOpen = button.getAttribute("aria-expanded") === "true";

        faqButtons.forEach((otherButton) => {
          const otherItem = otherButton.closest(".faq-item");
          const otherPanel = otherItem?.querySelector(".faq-item__panel");
          otherButton.setAttribute("aria-expanded", "false");
          otherItem?.classList.remove("is-open");
          otherPanel?.setAttribute("aria-hidden", "true");
        });

        if (!isOpen && item && panel) {
          button.setAttribute("aria-expanded", "true");
          item.classList.add("is-open");
          panel.setAttribute("aria-hidden", "false");
        }
      });
    });
  };

  const syncKeyboardState = () => {
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const keyboardOpen = window.innerWidth <= 768 && baseViewportHeight - viewportHeight > 140;

    document.body.classList.toggle("keyboard-open", keyboardOpen);

    if (floatingContactBar) {
      floatingContactBar.setAttribute("aria-hidden", String(keyboardOpen));
    }
  };

  const refreshGallery = async () => {
    try {
      const items = await fetchGalleryAssets();

      if (!Array.isArray(items) || !items.length) {
        state.galleryItems = fallbackGalleryItems;
        renderGallery(state.galleryItems);
        return;
      }

      state.galleryItems = items;
      renderGallery(state.galleryItems);
    } catch (_error) {
      state.galleryItems = fallbackGalleryItems;
      renderGallery(state.galleryItems);
    }
  };

  const refreshDynamicData = async (force = false) => {
    const now = Date.now();

    if (!force && now - state.lastDynamicRefreshAt < 3000) {
      return;
    }

    try {
      const results = await Promise.allSettled([
        fetchSiteSettings(),
        fetchBookedDates(),
        fetchReviews({ visibleOnly: true })
      ]);

      const [settingsResult, bookingsResult, reviewsResult] = results;

      if (settingsResult.status === "fulfilled") {
        state.siteSettings = settingsResult.value.settings;
        applyBrandSettings();

        if (state.siteSettings.hallStatusOpen === false) {
          state.selectedDate = null;
        }
      }

      if (bookingsResult.status === "fulfilled") {
        state.bookedDateSet = new Set(bookingsResult.value);
        state.bookingAvailabilityState = "ready";

        if (state.selectedDate && state.bookedDateSet.has(state.selectedDate)) {
          state.selectedDate = null;
        }
      } else {
        state.bookingAvailabilityState = state.bookedDateSet.size ? "stale" : "error";
        state.selectedDate = null;
      }

      renderCalendar();
      updateCalendarSelection();

      if (reviewsResult.status === "fulfilled") {
        state.reviews = reviewsResult.value.reviews;
        renderReviews();
      }

      state.lastDynamicRefreshAt = now;
    } catch (_error) {
      state.bookingAvailabilityState = state.bookedDateSet.size ? "stale" : "error";
      state.selectedDate = null;
      renderCalendar();
      updateCalendarSelection();
    }
  };

  const initializeLiveData = () => {
    unsubscribeLiveData = subscribeToVenueUpdates({
      onBookingsChange: () => {
        void refreshDynamicData(true);
      },
      onReviewsChange: () => {
        void refreshDynamicData(true);
      },
      onSettingsChange: () => {
        void refreshDynamicData(true);
      }
    });

    refreshTimer = window.setInterval(() => {
      void refreshDynamicData();
    }, 60000);
  };

  applyBrandSettings();
  renderReviews();
  state.galleryItems = fallbackGalleryItems;
  renderGallery(state.galleryItems);
  renderCalendar();
  updateCalendarSelection();
  handleReveal();
  initializeCustomCursor();
  initializeMagneticHover();
  initializeFaq();
  toggleHeader();
  syncKeyboardState();
  setVisibility(calendarModal, true);
  setVisibility(lightbox, true);
  setVisibility(mobileMenu, true);
  syncBodyState();

  refreshDynamicData(true);
  void refreshGallery();
  initializeLiveData();

  openCalendarButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  navToggle?.addEventListener("click", toggleMobileMenu);
  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  calendarClose?.addEventListener("click", closeCalendar);
  calendarModal?.addEventListener("click", (event) => {
    if (event.target === calendarModal) {
      closeCalendar();
    }
  });

  calendarPrev?.addEventListener("click", () => {
    state.currentMonth = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() - 1, 1);
    renderCalendar();
  });

  calendarNext?.addEventListener("click", () => {
    state.currentMonth = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() + 1, 1);
    renderCalendar();
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightboxPrev?.addEventListener("click", () => stepLightbox(-1));
  lightboxNext?.addEventListener("click", () => stepLightbox(1));
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  window.addEventListener("scroll", toggleHeader, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }

    if (Math.abs(window.innerHeight - baseViewportHeight) < 120) {
      baseViewportHeight = window.innerHeight;
    }

    syncKeyboardState();
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", syncKeyboardState);
  }

  window.addEventListener("focus", () => {
    void refreshDynamicData();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") {
      return;
    }

    void refreshDynamicData();
  });

  document.addEventListener("keydown", (event) => {
    trapFocus(event);

    if (event.key === "Escape") {
      closeCalendar();
      closeLightbox();
      closeMobileMenu();
    }

    if (lightbox && !lightbox.hidden) {
      if (event.key === "ArrowRight") {
        stepLightbox(1);
      }

      if (event.key === "ArrowLeft") {
        stepLightbox(-1);
      }
    }
  });

  window.addEventListener("beforeunload", () => {
    if (unsubscribeLiveData) {
      unsubscribeLiveData();
    }

    if (refreshTimer) {
      window.clearInterval(refreshTimer);
    }
  });
});

import { curatedTestimonials } from "./reviews.js";
import { openConciergeChat } from "./concierge-loader.js";

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
    fetchGalleryAssets = siteData.fetchGalleryAssets ?? fetchGalleryAssets;
    fetchSiteSettings = siteData.fetchSiteSettings;
    subscribeToVenueUpdates = siteData.subscribeToVenueUpdates;
  } catch (error) {
    console.warn("Supabase modules failed to load. Rendering the site with safe fallback data.", error);
  }

  const siteHeader = document.querySelector(".site-header");
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
  const conciergeChatButtons = document.querySelectorAll("[data-open-concierge-chat]");
  const reviewsTrack = document.getElementById("reviews-track");
  const reviewsMarquee = document.getElementById("reviews-marquee");
  const reviewsMobileTrack = document.getElementById("reviews-mobile-track");
  const reviewsMotionToggle = document.getElementById("reviews-motion-toggle");
  const reviewLink = document.getElementById("reviews-link");
  const revealTargets = document.querySelectorAll("[data-reveal]");
  const floatingContactBar = document.querySelector(".floating-contact-bar");
  const openCalendarButtons = document.querySelectorAll("[data-open-calendar]");
  const galleryContainer = document.querySelector(".gallery-masonry");
  let galleryTriggers = Array.from(document.querySelectorAll("[data-gallery-item]"));
  const reviewsMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reviewsMarqueeBreakpoint = 768;
  let baseViewportHeight = window.innerHeight;
  let unsubscribeLiveData = null;
  let refreshTimer = null;
  let reviewsAreManuallyPaused = false;

  const state = {
    siteSettings: { ...DEFAULT_SITE_SETTINGS },
    bookedDateSet: new Set(),
    bookingAvailabilityState: "loading",
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
    `${state.siteSettings.venueName} is an AC wedding and event venue in ${state.siteSettings.locationLabel}, Kerala with space for 250 guests, valet parking, hourly office room hire, and direct WhatsApp booking.`;

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
          `${WEBSITE_URL}/images/original-hall-gallery-5.webp`,
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
            name: "Air-conditioned office and meeting room",
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

  const reviewNeedsExpandControl = (review) =>
    `${review.text} ${review.translation ?? ""}`.trim().length > 220;

  const updateReviewExpandedState = () => {
    if (!reviewsTrack) {
      return;
    }

    const hasExpandedCard = Boolean(
      reviewsTrack.querySelector(".review-card.is-expanded:not(.review-card--clone)")
    );

    reviewsTrack.classList.toggle("has-expanded-card", hasExpandedCard);
  };

  const updateReviewsMotionToggle = () => {
    if (!reviewsMotionToggle) {
      return;
    }

    reviewsMotionToggle.textContent = reviewsAreManuallyPaused ? "Play motion" : "Pause motion";
    reviewsMotionToggle.setAttribute("aria-pressed", String(reviewsAreManuallyPaused));
  };

  const canAnimateReviews = () =>
    Boolean(reviewsTrack && reviewsMarquee) &&
    !reviewsMotionQuery.matches &&
    window.innerWidth > reviewsMarqueeBreakpoint;

  const measureReviewMarquee = () => {
    if (!reviewsMarquee) {
      return;
    }

    const marqueeIsActive = canAnimateReviews();

    reviewsMarquee.querySelectorAll(".reviews-marquee__lane").forEach((lane) => {
      const primaryTrack = lane.querySelector(".reviews-marquee__track");

      if (!primaryTrack) {
        return;
      }

      const computedStyle = window.getComputedStyle(primaryTrack);
      const gap = Number.parseFloat(computedStyle.gap || computedStyle.columnGap || "0") || 0;
      const distance = primaryTrack.scrollWidth;

      lane.style.setProperty("--reviews-distance", `${distance}px`);
      lane.style.setProperty("--review-gap", `${gap}px`);
      lane.classList.toggle("is-ready", marqueeIsActive && distance > 0);
    });
  };

  const syncReviewPresentationMode = () => {
    if (!reviewsTrack) {
      return;
    }

    const marqueeIsActive = canAnimateReviews();

    reviewsTrack.classList.toggle("is-static", !marqueeIsActive);
    reviewsTrack.classList.toggle("is-animated", marqueeIsActive);

    if (!marqueeIsActive) {
      reviewsAreManuallyPaused = false;
      reviewsTrack.classList.remove("is-manually-paused");
      updateReviewsMotionToggle();
    }

    if (reviewsMotionToggle) {
      reviewsMotionToggle.hidden = !marqueeIsActive;
    }

    measureReviewMarquee();
  };

  const buildReviewCard = (review, { duplicate = false } = {}) => {
    const article = createElement("article", "review-card");
    const stars = createElement("p", "review-card__stars", "★★★★★");
    const body = createElement("div", "review-card__body");
    const text = createElement("p", "review-card__text", review.text);
    const meta = createElement("div", "review-card__meta");
    const name = createElement("span", "review-card__name", review.name);
    const source = createElement("span", "review-card__source", "Google Review");
    const isLongReview = reviewNeedsExpandControl(review);

    article.dataset.reviewId = review.id;
    stars.setAttribute("aria-label", "5 out of 5 stars");

    if (duplicate) {
      article.classList.add("review-card--clone");
      article.setAttribute("aria-hidden", "true");
    } else {
      article.tabIndex = 0;
    }

    if (review.translation) {
      text.lang = "ml";
    }

    body.append(text);

    if (review.translation) {
      const translation = createElement(
        "p",
        "review-card__translation",
        `English: ${review.translation}`
      );
      body.append(translation);
    }

    meta.append(name, source);
    article.append(stars, body);

    if (isLongReview && !duplicate) {
      const toggle = createElement("button", "review-card__toggle", "Read full review");
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", "false");

      toggle.addEventListener("click", () => {
        const isExpanded = article.classList.toggle("is-expanded");
        toggle.textContent = isExpanded ? "Show less" : "Read full review";
        toggle.setAttribute("aria-expanded", String(isExpanded));
        updateReviewExpandedState();
        measureReviewMarquee();
      });

      article.append(toggle);
    }

    article.append(meta);
    return article;
  };

  const buildReviewLane = (reviews, durationSeconds) => {
    const lane = createElement("div", "reviews-marquee__lane");
    const primaryTrack = createElement("div", "reviews-marquee__track");
    const cloneTrack = createElement("div", "reviews-marquee__track reviews-marquee__track--clone");

    lane.style.setProperty("--reviews-duration", `${durationSeconds}s`);
    cloneTrack.setAttribute("aria-hidden", "true");

    primaryTrack.append(...reviews.map((review) => buildReviewCard(review)));
    cloneTrack.append(...reviews.map((review) => buildReviewCard(review, { duplicate: true })));
    lane.append(primaryTrack, cloneTrack);

    return lane;
  };

  const renderReviews = () => {
    if (!reviewsTrack || !reviewsMarquee || !reviewsMobileTrack) {
      return;
    }

    const midpoint = Math.ceil(curatedTestimonials.length / 2);
    const laneGroups = [
      curatedTestimonials.slice(0, midpoint),
      curatedTestimonials.slice(midpoint)
    ].filter((reviews) => reviews.length);

    reviewsMarquee.replaceChildren(
      ...laneGroups.map((reviews, index) => buildReviewLane(reviews, 44 + index * 8))
    );
    reviewsMobileTrack.replaceChildren(...curatedTestimonials.map((review) => buildReviewCard(review)));

    updateReviewExpandedState();
    syncReviewPresentationMode();
    window.requestAnimationFrame(measureReviewMarquee);
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


  /**
   * Luxury Preloader Control (with fail-safe)
   */
  const dismissPreloader = () => {
    const preloader = document.getElementById("site-preloader");
    if (preloader && !preloader.classList.contains("is-loaded")) {
      preloader.classList.add("is-loaded");
      
      setTimeout(() => {
        const heroContent = document.querySelector(".hero__content");
        if (heroContent) heroContent.classList.add("is-visible");
      }, 400);
    }
  };

  // Immediate check if window is already loaded
  if (document.readyState === "complete") {
    dismissPreloader();
  } else {
    window.addEventListener("load", dismissPreloader);
  }

  // Mandatory fail-safe (shows site after 3s max even if some image is slow)
  setTimeout(dismissPreloader, 3000);


  /**
   * High-end Custom Cursor Logic
   */
  const initializeCustomCursor = () => {
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    window.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener("mousedown", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    });

    document.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    });

    const interactables = "a, button, input, textarea, [role='button']";
    document.querySelectorAll(interactables).forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hovering"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hovering"));
    });
  };

  /**
   * Magnetic Hover Effect for Luxury Interactivity
   */
  const initializeMagneticHover = () => {
    const magneticTargets = document.querySelectorAll(".site-logo, .button--solid");
    const heroTitle = document.querySelector(".hero h1");

    magneticTargets.forEach((target) => {
      target.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = target.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        target.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      target.addEventListener("mouseleave", () => {
        target.style.transform = "translate(0, 0)";
      });
    });

    if (heroTitle) {
      heroTitle.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = heroTitle.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // 3D Tilt Calculation
        const rotateX = ((mouseY - centerY) / (height / 2)) * -12; // -12 to 12 degrees
        const rotateY = ((mouseX - centerX) / (width / 2)) * 12; // -12 to 12 degrees
        
        // Horizontal Translation (Magnetic)
        const moveX = (mouseX - centerX) * 0.05;
        const moveY = (mouseY - centerY) * 0.05;

        heroTitle.style.transform = `perspective(1000px) translate3d(${moveX}px, ${moveY}px, 20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      heroTitle.addEventListener("mouseleave", () => {
        heroTitle.style.transform = "perspective(1000px) translate3d(0, 0, 0) rotateX(0) rotateY(0)";
      });
    }
  };

  const initializeTiltedCards = () => {
    const cards = Array.from(document.querySelectorAll("[data-tilted-card]"));

    if (!cards.length) {
      return;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const setCardDefaults = (container) => {
      container.style.setProperty("--tilted-rotate-x", "0deg");
      container.style.setProperty("--tilted-rotate-y", "0deg");
      container.style.setProperty("--tilted-scale", "1");
      container.style.setProperty("--tilted-pointer-x", "24px");
      container.style.setProperty("--tilted-pointer-y", "24px");
      container.style.setProperty("--tilted-caption-rotate", "0deg");
    };

    const resetCard = (container) => {
      container.classList.remove("is-tilted-active");
      setCardDefaults(container);
    };

    cards.forEach((card) => {
      const container = card.closest(".feature-row__media");

      if (!container) {
        return;
      }

      let frameId = 0;
      let nextPoint = null;
      let lastOffsetY = 0;

      const runTilt = ({ clientX, clientY }) => {
        if (reducedMotionQuery.matches || !finePointerQuery.matches) {
          resetCard(container);
          return;
        }

        const rect = container.getBoundingClientRect();
        const rotateAmplitude = Number.parseFloat(card.dataset.tiltAmplitude || "14");
        const scaleOnHover = Number.parseFloat(card.dataset.tiltScale || "1.1");
        const offsetX = clientX - rect.left - rect.width / 2;
        const offsetY = clientY - rect.top - rect.height / 2;
        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
        const captionX = clamp(clientX - rect.left + 16, 16, rect.width - 16);
        const captionY = clamp(clientY - rect.top + 16, 16, rect.height - 16);
        const velocityY = offsetY - lastOffsetY;

        lastOffsetY = offsetY;

        container.classList.add("is-tilted-active");
        container.style.setProperty("--tilted-rotate-x", `${rotationX.toFixed(2)}deg`);
        container.style.setProperty("--tilted-rotate-y", `${rotationY.toFixed(2)}deg`);
        container.style.setProperty("--tilted-scale", String(scaleOnHover));
        container.style.setProperty("--tilted-pointer-x", `${captionX}px`);
        container.style.setProperty("--tilted-pointer-y", `${captionY}px`);
        container.style.setProperty("--tilted-caption-rotate", `${(-velocityY * 0.6).toFixed(2)}deg`);
      };

      const queueTilt = (event) => {
        nextPoint = {
          clientX: event.clientX,
          clientY: event.clientY
        };

        if (frameId) {
          return;
        }

        frameId = window.requestAnimationFrame(() => {
          frameId = 0;

          if (nextPoint) {
            runTilt(nextPoint);
          }
        });
      };

      const handleLeave = () => {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }

        nextPoint = null;
        lastOffsetY = 0;
        resetCard(container);
      };

      card.addEventListener("pointerenter", queueTilt);
      card.addEventListener("pointermove", queueTilt);
      card.addEventListener("pointerleave", handleLeave);
      card.addEventListener("pointercancel", handleLeave);

      setCardDefaults(container);
    });

    const syncCardAvailability = () => {
      if (!finePointerQuery.matches || reducedMotionQuery.matches) {
        cards.forEach((card) => {
          const container = card.closest(".feature-row__media");

          if (!container) {
            return;
          }

          resetCard(container);
        });
      }
    };

    if (typeof finePointerQuery.addEventListener === "function") {
      finePointerQuery.addEventListener("change", syncCardAvailability);
    }

    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", syncCardAvailability);
    }

    syncCardAvailability();
  };


  /**
   * Cinematic Scroll Parallax
   */
  const initializeParallax = () => {
    const heroMedia = document.querySelector(".hero__media");
    if (!heroMedia) return;

    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const depth = 0.18; // Speed of movement
          const movement = window.scrollY * depth;
          heroMedia.style.setProperty("--hero-parallax", `${movement}px`);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  };

  const toggleHeader = () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const isScrolled = window.scrollY > 24;
    header.classList.toggle("is-scrolled", isScrolled);
  };

  const handleReveal = () => {
    const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    let revealQueue = [];
    const flushQueue = () => {
      revealQueue.forEach((el, index) => {
        el.style.transitionDelay = `${index * 80}ms`;
        el.classList.add("is-visible");
      });
      revealQueue = [];
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          
          const target = entry.target;
          revealQueue.push(target);
          observer.unobserve(target);
        });

        if (revealQueue.length) {
          window.requestAnimationFrame(flushQueue);
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: "0px 0px -8% 0px" 
      }
    );

    revealTargets.forEach((target) => observer.observe(target));
  };

  const SECTION_NAV_IDS = ["hall", "office", "gallery", "pricing", "reviews", "contact"];

  let navSpyFrame = 0;

  const updateSectionNav = () => {
    navSpyFrame = 0;
    const navLinks = document.querySelectorAll(
      '.site-nav__links a[href^="#"], .mobile-menu a[href^="#"], .site-footer__nav a[href^="#"]'
    );
    const marker = window.scrollY + window.innerHeight * 0.34;
    let activeId = null;

    for (const id of SECTION_NAV_IDS) {
      const section = document.getElementById(id);

      if (!section) {
        continue;
      }

      if (section.offsetTop <= marker) {
        activeId = id;
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const match = href && href.startsWith("#") ? href.slice(1) : null;
      link.classList.toggle("is-active", Boolean(match) && Boolean(activeId) && match === activeId);
    });
  };

  const scheduleSectionNavUpdate = () => {
    if (navSpyFrame) {
      return;
    }

    navSpyFrame = window.requestAnimationFrame(updateSectionNav);
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
      const results = await Promise.allSettled([fetchSiteSettings(), fetchBookedDates()]);

      const [settingsResult, bookingsResult] = results;

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
  updateReviewsMotionToggle();
  state.galleryItems = fallbackGalleryItems;
  renderGallery(state.galleryItems);
  renderCalendar();
  updateCalendarSelection();
  handleReveal();
  initializeFaq();
  initializeCustomCursor();
  initializeMagneticHover();
  initializeTiltedCards();
  initializeParallax();
  toggleHeader();

  updateSectionNav();
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

  conciergeChatButtons.forEach((button) => {
    button.addEventListener("click", () => {
      void openConciergeChat(button);
    });
  });

  navToggle?.addEventListener("click", toggleMobileMenu);
  reviewsMotionToggle?.addEventListener("click", () => {
    reviewsAreManuallyPaused = !reviewsAreManuallyPaused;
    reviewsTrack?.classList.toggle("is-manually-paused", reviewsAreManuallyPaused);
    updateReviewsMotionToggle();
  });
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

  window.addEventListener(
    "scroll",
    () => {
      toggleHeader();
      scheduleSectionNavUpdate();
    },
    { passive: true }
  );
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }

    if (Math.abs(window.innerHeight - baseViewportHeight) < 120) {
      baseViewportHeight = window.innerHeight;
    }

    syncKeyboardState();
    syncReviewPresentationMode();
    scheduleSectionNavUpdate();
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", syncKeyboardState);
  }

  if (typeof reviewsMotionQuery.addEventListener === "function") {
    reviewsMotionQuery.addEventListener("change", syncReviewPresentationMode);
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

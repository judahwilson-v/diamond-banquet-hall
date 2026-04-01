const BRAND_CONSTANTS = {
  venueName: "Diamond Banquet Hall",
  shortName: "Diamond",
  locationLabel: "Allapra, Perumbavoor",
  address: "First Floor, Diamond Arcade, Allapra P.O, Perumbavoor, Ernakulam, Kerala 683556",
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
};

document.addEventListener("DOMContentLoaded", () => {
  const SITE_SETTINGS_KEY = "diamondSiteSettings";
  const BOOKING_STORAGE_KEY = "diamondBookedDates";
  const REVIEWS_STORAGE_KEY = "diamondReviews";
  const loadingScreen = document.getElementById("loading-screen");
  const siteHeader = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const calendarModal = document.getElementById("calendar-modal");
  const calendarClose = document.getElementById("calendar-close");
  const calendarLabel = document.getElementById("calendar-month-label");
  const calendarDays = document.getElementById("calendar-days");
  const calendarPrev = document.getElementById("calendar-prev");
  const calendarNext = document.getElementById("calendar-next");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const faqButtons = document.querySelectorAll(".faq-item__button");
  const reviewsTrack = document.getElementById("reviews-track");
  const reviewLink = document.getElementById("reviews-link");
  const revealTargets = document.querySelectorAll("[data-reveal]");
  const whatsappFloat = document.querySelector(".whatsapp-float");
  const openCalendarButtons = document.querySelectorAll("[data-open-calendar]");
  const galleryTriggers = Array.from(document.querySelectorAll("[data-gallery-item]"));
  let currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  let lightboxIndex = 0;
  let lastActiveElement = null;
  let baseViewportHeight = window.innerHeight;

  const readJSONStorage = (key, fallback) => {
    try {
      const rawValue = localStorage.getItem(key);
      return rawValue ? JSON.parse(rawValue) : fallback;
    } catch (error) {
      return fallback;
    }
  };

  const brandSettings = {
    ...BRAND_CONSTANTS,
    ...readJSONStorage(SITE_SETTINGS_KEY, {}),
  };

  const mergedBookedDates = (() => {
    const localDates = readJSONStorage(BOOKING_STORAGE_KEY, null);
    return Array.isArray(localDates) ? localDates : bookedDates;
  })();

  const mergedReviews = (() => {
    const localReviews = readJSONStorage(REVIEWS_STORAGE_KEY, null);
    return Array.isArray(localReviews) ? localReviews : reviews;
  })();

  const activeBookedDates = new Set(mergedBookedDates);

  const applyBrandSettings = () => {
    document.querySelectorAll("[data-brand-text]").forEach((element) => {
      const key = element.dataset.brandText;

      if (key in brandSettings) {
        element.textContent = brandSettings[key];
      }
    });

    document.querySelectorAll("[data-brand-html]").forEach((element) => {
      const key = element.dataset.brandHtml;

      if (key === "hallPrice") {
        element.innerHTML = `₹${Number(brandSettings.hallPrice).toLocaleString("en-IN")} / 4 hrs`;
      }

      if (key === "roomPrice") {
        element.innerHTML = `₹${Number(brandSettings.roomPrice).toLocaleString("en-IN")} / night`;
      }

      if (key === "hallPriceAmount") {
        element.innerHTML = `₹${Number(brandSettings.hallPrice).toLocaleString("en-IN")}`;
      }

      if (key === "roomPriceAmount") {
        element.innerHTML = `₹${Number(brandSettings.roomPrice).toLocaleString("en-IN")}`;
      }

      if (key === "roomSummary") {
        element.innerHTML = `${brandSettings.roomCount} air-conditioned rooms for your guests`;
      }

      if (key === "hallFeatureChip") {
        element.innerHTML = `250 Guests · Full AC · ₹${Number(brandSettings.hallPrice).toLocaleString("en-IN")} / 4 hrs`;
      }
    });

    document.querySelectorAll("[data-brand-href]").forEach((element) => {
      const key = element.dataset.brandHref;

      if (key in brandSettings) {
        element.setAttribute("href", brandSettings[key]);
      }
    });
  };

  const buildReviewCard = (review) => {
    const article = document.createElement("article");
    article.className = "review-card";
    article.innerHTML = `
      <p class="review-card__stars" aria-label="5 out of 5 stars">★★★★★</p>
      <p class="review-card__text">${review.text}</p>
      <div class="review-card__meta">
        <span class="review-card__name">${review.name}</span>
        <span class="review-card__event">${review.event} · ${review.date}</span>
      </div>
    `;
    return article;
  };

  const renderReviews = () => {
    if (!reviewsTrack) {
      return;
    }

    reviewsTrack.innerHTML = "";
    mergedReviews.forEach((review) => {
      reviewsTrack.append(buildReviewCard(review));
    });

    if (reviewLink) {
      reviewLink.href = brandSettings.mapsHref;
    }
  };

  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const renderCalendar = () => {
    if (!calendarLabel || !calendarDays) {
      return;
    }

    const today = new Date();
    const todayKey = formatDateKey(today);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const leadingDays = firstDay.getDay();
    const totalCells = Math.ceil((leadingDays + lastDay.getDate()) / 7) * 7;

    calendarLabel.textContent = currentMonth.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });

    calendarDays.innerHTML = "";

    for (let cell = 0; cell < totalCells; cell += 1) {
      const dayNumber = cell - leadingDays + 1;
      const cellDate = new Date(year, month, dayNumber);
      const cellKey = formatDateKey(cellDate);
      const button = document.createElement("button");
      const isCurrentMonth = cellDate.getMonth() === month;
      const isToday = cellKey === todayKey;
      const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isBooked = activeBookedDates.has(cellKey);

      button.type = "button";
      button.className = "calendar-day";
      button.innerHTML = `
        <span class="calendar-day__number">${cellDate.getDate()}</span>
        <span class="calendar-day__label">${isBooked ? "Booked" : "Available"}</span>
      `;
      button.disabled = isBooked || isPast || !isCurrentMonth;

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
        button.title = "Booked";
      }

      calendarDays.append(button);
    }
  };

  const openCalendar = () => {
    if (!calendarModal) {
      return;
    }

    lastActiveElement = document.activeElement;
    document.body.classList.add("modal-open");
    calendarModal.hidden = false;
    renderCalendar();
    calendarClose?.focus();
  };

  const closeCalendar = () => {
    if (!calendarModal) {
      return;
    }

    calendarModal.hidden = true;
    document.body.classList.remove("modal-open");

    if (lastActiveElement instanceof HTMLElement) {
      lastActiveElement.focus();
    }
  };

  const openLightbox = (index) => {
    const item = galleryTriggers[index];

    if (!item || !lightbox || !lightboxImage) {
      return;
    }

    lightboxIndex = index;
    lightbox.hidden = false;
    document.body.classList.add("modal-open");
    lightboxImage.src = item.dataset.lightboxSrc || "";
    lightboxImage.alt = item.dataset.lightboxAlt || "";

    if (lightboxCaption) {
      lightboxCaption.textContent = item.dataset.lightboxAlt || "";
    }

    lightboxClose?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) {
      return;
    }

    lightbox.hidden = true;
    document.body.classList.remove("modal-open");
  };

  const stepLightbox = (direction) => {
    if (!galleryTriggers.length) {
      return;
    }

    lightboxIndex = (lightboxIndex + direction + galleryTriggers.length) % galleryTriggers.length;
    openLightbox(lightboxIndex);
  };

  const toggleHeader = () => {
    if (!siteHeader) {
      return;
    }

    siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const closeMobileMenu = () => {
    if (!mobileMenu || !navToggle) {
      return;
    }

    mobileMenu.hidden = true;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
  };

  const toggleMobileMenu = () => {
    if (!mobileMenu || !navToggle) {
      return;
    }

    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation menu" : "Close navigation menu"
    );
    mobileMenu.hidden = isOpen;
    document.body.classList.toggle("menu-open", !isOpen);
  };

  const handleReveal = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
        threshold: 0.15,
      }
    );

    revealTargets.forEach((target) => observer.observe(target));
  };

  const initializeFaq = () => {
    faqButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        const isOpen = button.getAttribute("aria-expanded") === "true";

        faqButtons.forEach((otherButton) => {
          otherButton.setAttribute("aria-expanded", "false");
          otherButton.closest(".faq-item")?.classList.remove("is-open");
        });

        if (!isOpen && item) {
          button.setAttribute("aria-expanded", "true");
          item.classList.add("is-open");
        }
      });
    });
  };

  const syncKeyboardState = () => {
    const viewportHeight = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight;
    const keyboardOpen =
      window.innerWidth <= 768 && baseViewportHeight - viewportHeight > 140;

    document.body.classList.toggle("keyboard-open", keyboardOpen);

    if (whatsappFloat) {
      whatsappFloat.setAttribute("aria-hidden", String(keyboardOpen));
    }
  };

  applyBrandSettings();
  renderReviews();
  renderCalendar();
  handleReveal();
  initializeFaq();
  toggleHeader();
  syncKeyboardState();

  openCalendarButtons.forEach((button) => {
    button.addEventListener("click", openCalendar);
  });

  galleryTriggers.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
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
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    renderCalendar();
  });

  calendarNext?.addEventListener("click", () => {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCalendar();
      closeLightbox();
      closeMobileMenu();
    }

    if (!lightbox.hidden) {
      if (event.key === "ArrowRight") {
        stepLightbox(1);
      }

      if (event.key === "ArrowLeft") {
        stepLightbox(-1);
      }
    }
  });

  window.addEventListener("load", () => {
    const loadDuration = performance.now();

    if (loadDuration < 500) {
      document.body.classList.add("loaded");
      loadingScreen?.remove();
      return;
    }

    window.setTimeout(() => {
      document.body.classList.add("loaded");
      loadingScreen?.addEventListener("transitionend", () => loadingScreen.remove(), {
        once: true,
      });
    }, 120);
  });
});

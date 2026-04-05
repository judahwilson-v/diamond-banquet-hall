document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const siteHeader = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const footerYear = document.getElementById("site-footer-year");
  const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));
  const filterButtons = Array.from(document.querySelectorAll(".gallery-filter__button"));
  const galleryCards = Array.from(document.querySelectorAll("#event-gallery .gallery-card"));
  const loadMoreButton = document.getElementById("gallery-load-more");
  const initialBatchSize = 6;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    activeCategory: "all",
    visibleCount: initialBatchSize
  };

  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }

  const setMenuState = (isOpen) => {
    if (!mobileMenu || !navToggle) {
      return;
    }

    mobileMenu.hidden = !isOpen;
    mobileMenu.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    body.classList.toggle("menu-open", isOpen);
  };

  const toggleHeader = () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const initializeCustomCursor = () => {
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    window.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    const interactables = "a, button, input, textarea, [role='button']";
    document.querySelectorAll(interactables).forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hovering"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hovering"));
    });
  };

  const initializeMagneticHover = () => {
    const magneticTargets = document.querySelectorAll(".site-logo, .gallery-filter__button, .button");
    
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
  };


  let revealObserver = null;

  const revealElement = (element) => {
    if (!element) {
      return;
    }

    element.classList.add("is-visible");
    revealObserver?.unobserve(element);
  };

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          revealElement(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -4% 0px"
      }
    );
  }

  const queueReveal = (element) => {
    if (!element || element.hidden) {
      return;
    }

    if (prefersReducedMotion || !revealObserver) {
      revealElement(element);
      return;
    }

    revealObserver.observe(element);
  };

  const syncFilterButtons = () => {
    filterButtons.forEach((button) => {
      const isActive = button.dataset.category === state.activeCategory;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const getMatchingCards = () =>
    galleryCards.filter(
      (card) => state.activeCategory === "all" || card.dataset.category === state.activeCategory
    );

  const renderGallery = ({ resetAnimation = false } = {}) => {
    const matchingCards = getMatchingCards();
    const visibleCards = new Set(matchingCards.slice(0, state.visibleCount));

    galleryCards.forEach((card) => {
      const shouldShow = visibleCards.has(card);
      card.hidden = !shouldShow;
      card.setAttribute("aria-hidden", String(!shouldShow));

      if (!shouldShow) {
        card.classList.remove("is-visible");
        revealObserver?.unobserve(card);
        return;
      }

      if (resetAnimation) {
        card.classList.remove("is-visible");
      }

      window.requestAnimationFrame(() => {
        queueReveal(card);
      });
    });

    if (loadMoreButton) {
      const hasMore = matchingCards.length > state.visibleCount;
      loadMoreButton.hidden = !hasMore;
      loadMoreButton.disabled = !hasMore;
      loadMoreButton.setAttribute("aria-hidden", String(!hasMore));
    }
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextCategory = button.dataset.category || "all";

      if (nextCategory === state.activeCategory) {
        return;
      }

      state.activeCategory = nextCategory;
      state.visibleCount = initialBatchSize;
      syncFilterButtons();
      renderGallery({ resetAnimation: true });
    });
  });

  loadMoreButton?.addEventListener("click", () => {
    state.visibleCount += initialBatchSize;
    renderGallery({ resetAnimation: true });
  });

  window.addEventListener("scroll", toggleHeader, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  revealTargets.forEach((target) => queueReveal(target));
  initializeCustomCursor();
  initializeMagneticHover();
  syncFilterButtons();
  renderGallery();
  toggleHeader();
});

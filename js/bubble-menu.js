class BubbleMenu {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      menuBg: options.menuBg || '#fff',
      menuContentColor: options.menuContentColor || '#111',
      items: options.items || [],
      animationEase: options.animationEase || 'back.out(1.5)',
      animationDuration: options.animationDuration || 0.5,
      staggerDelay: options.staggerDelay || 0.12,
      useFixedPosition: options.useFixedPosition || false
    };

    this.isMenuOpen = false;
    this.init();
  }

  init() {
    // Generate HTML
    const navHTML = `
      <nav class="bubble-menu ${this.options.useFixedPosition ? 'fixed' : 'absolute'}" aria-label="Main navigation">
        <div class="bubble logo-bubble" aria-label="Logo" style="background: ${this.options.menuBg}">
          <span class="logo-content" style="font-weight: 700; color: ${this.options.menuContentColor}; font-size: 0.9rem;">DIAMOND</span>
        </div>
        <button type="button" class="bubble toggle-bubble menu-btn" aria-label="Toggle menu" style="background: ${this.options.menuBg}">
          <span class="menu-line" style="background: ${this.options.menuContentColor}"></span>
          <span class="menu-line short" style="background: ${this.options.menuContentColor}"></span>
        </button>
      </nav>
      <div class="bubble-menu-items ${this.options.useFixedPosition ? 'fixed' : 'absolute'}" style="display: none;">
        <ul class="pill-list" role="menu">
          ${this.options.items.map((item, idx) => `
            <li role="none" class="pill-col">
              <a role="menuitem" href="${item.href}" class="pill-link" 
                style="--item-rot: ${item.rotation || 0}deg; --pill-bg: ${this.options.menuBg}; --pill-color: ${this.options.menuContentColor}; --hover-bg: ${item.hoverStyles.bgColor}; --hover-color: ${item.hoverStyles.textColor}">
                <span class="pill-label">${item.label}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    this.container.innerHTML = navHTML;

    // Select elements
    this.toggleBtn = this.container.querySelector('.menu-btn');
    this.overlay = this.container.querySelector('.bubble-menu-items');
    this.bubbles = Array.from(this.container.querySelectorAll('.pill-link'));
    this.labels = Array.from(this.container.querySelectorAll('.pill-label'));

    // Bind events
    this.toggleBtn.addEventListener('click', () => this.toggleMenu());
    window.addEventListener('resize', () => this.handleResize());
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleBtn.classList.toggle('open', this.isMenuOpen);
    this.toggleBtn.setAttribute('aria-pressed', this.isMenuOpen.toString());

    if (this.isMenuOpen) {
      gsap.set(this.overlay, { display: 'flex' });
      gsap.killTweensOf([...this.bubbles, ...this.labels]);
      gsap.set(this.bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(this.labels, { y: 24, autoAlpha: 0 });

      this.bubbles.forEach((bubble, i) => {
        const delay = i * this.options.staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          duration: this.options.animationDuration,
          ease: this.options.animationEase
        });
        if (this.labels[i]) {
          tl.to(
            this.labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: this.options.animationDuration,
              ease: 'power3.out'
            },
            `-=${this.options.animationDuration * 0.9}`
          );
        }
      });
    } else {
      gsap.killTweensOf([...this.bubbles, ...this.labels]);
      gsap.to(this.labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(this.bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(this.overlay, { display: 'none' });
        }
      });
    }
  }

  handleResize() {
    if (this.isMenuOpen) {
      const isDesktop = window.innerWidth >= 900;
      this.bubbles.forEach((bubble, i) => {
        const item = this.options.items[i];
        if (bubble && item) {
          const rotation = isDesktop ? (item.rotation ?? 0) : 0;
          gsap.set(bubble, { rotation });
        }
      });
    }
  }
}

window.BubbleMenu = BubbleMenu;

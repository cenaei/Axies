(() => {
  // src/js/state/store.js
  var Store = class {
    constructor(initialState) {
      this.state = initialState;
      this.listeners = /* @__PURE__ */ new Map();
    }
    getState() {
      return this.state;
    }
    setState(partialState) {
      const prevState = { ...this.state };
      this.state = { ...this.state, ...partialState };
      Object.keys(partialState).forEach((key) => {
        if (this.listeners.has(key)) {
          this.listeners.get(key).forEach((listener) => {
            listener(this.state[key], prevState[key]);
          });
        }
      });
      if (this.listeners.has("*")) {
        this.listeners.get("*").forEach((listener) => {
          listener(this.state, prevState);
        });
      }
    }
    subscribe(key, listener) {
      if (!this.listeners.has(key)) {
        this.listeners.set(key, /* @__PURE__ */ new Set());
      }
      this.listeners.get(key).add(listener);
      return () => {
        this.listeners.get(key).delete(listener);
      };
    }
  };
  var getInitialLikedIds = () => {
    try {
      const saved = localStorage.getItem("axies_liked_ids");
      return saved ? new Set(JSON.parse(saved)) : /* @__PURE__ */ new Set(["nft-1", "nft-4"]);
    } catch (e) {
      return /* @__PURE__ */ new Set(["nft-1", "nft-4"]);
    }
  };
  var store = new Store({
    theme: "dark",
    activeCategory: "all",
    searchQuery: "",
    wallet: {
      isConnected: false,
      address: null,
      provider: null
    },
    likedIds: getInitialLikedIds()
  });

  // src/js/modules/toast.js
  var container = null;
  var ensureContainer = () => {
    if (!container) {
      container = document.querySelector(".toast-container");
      if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        container.setAttribute("role", "region");
        container.setAttribute("aria-label", "Notifications");
        document.body.appendChild(container);
      }
    }
    return container;
  };
  var showToast = (message, type = "info", duration = 2200) => {
    const toastBox = ensureContainer();
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    const icons = {
      success: `<svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" class="toast__icon" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>`,
      error: `<svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" class="toast__icon" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" /></svg>`,
      info: `<svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" class="toast__icon" aria-hidden="true"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" /></svg>`
    };
    toast.innerHTML = `
    ${icons[type] || icons.info}
    <span class="toast__text">${escapeHTML(message)}</span>
  `;
    toastBox.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    }, duration);
  };
  function escapeHTML(str) {
    return str.replace(
      /[&<>'"]/g,
      (tag) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[tag] || tag
    );
  }

  // src/js/modules/theme.js
  var STORAGE_KEY = "axies_theme_preference";
  var initTheme = () => {
    const themeCheckbox = document.querySelector("#theme-switch-checkbox");
    const sunBtn = document.querySelector("#theme-sun-btn");
    const moonBtn = document.querySelector("#theme-moon-btn");
    const getPreferredTheme = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "light" || stored === "dark") {
          return stored;
        }
      } catch (e) {
        console.warn("Storage access restricted", e);
      }
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
      }
      return "dark";
    };
    const applyTheme = (theme, notify = false) => {
      document.documentElement.setAttribute("data-theme", theme);
      store.setState({ theme });
      if (themeCheckbox) {
        const isDark = theme === "dark";
        themeCheckbox.checked = isDark;
        themeCheckbox.setAttribute("aria-checked", isDark ? "true" : "false");
      }
      if (sunBtn && moonBtn) {
        if (theme === "light") {
          sunBtn.classList.add("active");
          sunBtn.setAttribute("aria-pressed", "true");
          moonBtn.classList.remove("active");
          moonBtn.setAttribute("aria-pressed", "false");
        } else {
          moonBtn.classList.add("active");
          moonBtn.setAttribute("aria-pressed", "true");
          sunBtn.classList.remove("active");
          sunBtn.setAttribute("aria-pressed", "false");
        }
      }
      if (notify) {
        showToast(`Switched to ${theme === "light" ? "Light" : "Dark"} mode`, "info", 1800);
      }
    };
    const setTheme = (theme) => {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (e) {
        console.warn("Could not save theme", e);
      }
      applyTheme(theme, true);
    };
    if (themeCheckbox) {
      themeCheckbox.addEventListener("change", (e) => {
        setTheme(e.target.checked ? "dark" : "light");
      });
    }
    if (sunBtn) {
      sunBtn.addEventListener("click", () => setTheme("light"));
    }
    if (moonBtn) {
      moonBtn.addEventListener("click", () => setTheme("dark"));
    }
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
      mediaQuery.addEventListener("change", (e) => {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (!stored) {
            applyTheme(e.matches ? "light" : "dark", true);
          }
        } catch (err) {
          applyTheme(e.matches ? "light" : "dark");
        }
      });
    }
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme, false);
  };

  // src/js/modules/navigation.js
  var initNavigation = () => {
    const hamburgerBtn = document.querySelector("#mobile-hamburger-btn");
    const mobileNav = document.querySelector("#mobile-nav");
    const mobileBackdrop = document.querySelector("#mobile-nav-backdrop");
    const mobileCloseBtn = document.querySelector("#mobile-nav-close-btn");
    const openMobileNav = () => {
      if (!mobileNav) return;
      mobileNav.classList.add("active");
      if (mobileBackdrop) mobileBackdrop.classList.add("active");
      if (hamburgerBtn) hamburgerBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      if (mobileCloseBtn) mobileCloseBtn.focus();
    };
    const closeMobileNav = () => {
      if (!mobileNav) return;
      mobileNav.classList.remove("active");
      if (mobileBackdrop) mobileBackdrop.classList.remove("active");
      if (hamburgerBtn) {
        hamburgerBtn.setAttribute("aria-expanded", "false");
        hamburgerBtn.focus();
      }
      document.body.style.overflow = "";
    };
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener("click", () => {
        const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }
    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener("click", closeMobileNav);
    }
    if (mobileBackdrop) {
      mobileBackdrop.addEventListener("click", closeMobileNav);
    }
    if (mobileNav) {
      mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMobileNav);
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (mobileNav && mobileNav.classList.contains("active")) {
          closeMobileNav();
        }
      }
    });
    const dropdownParents = document.querySelectorAll(".header__menu--items > li");
    dropdownParents.forEach((item) => {
      const triggerLink = item.querySelector(":scope > a");
      const subMenu = item.querySelector(":scope > ul");
      if (triggerLink && subMenu) {
        triggerLink.setAttribute("aria-haspopup", "true");
        triggerLink.setAttribute("aria-expanded", "false");
        item.addEventListener("focusin", () => {
          triggerLink.setAttribute("aria-expanded", "true");
        });
        item.addEventListener("focusout", (e) => {
          if (!item.contains(e.relatedTarget)) {
            triggerLink.setAttribute("aria-expanded", "false");
          }
        });
      }
    });
  };

  // src/js/modules/carousel.js
  var initCarousel = () => {
    const track = document.querySelector(".carousel-track, .swiper-wrapper");
    const prevBtn = document.querySelector("#carousel-prev-btn, .swiper-button-prev");
    const nextBtn = document.querySelector("#carousel-next-btn, .swiper-button-next");
    if (!track) return;
    const getScrollStep = () => {
      const firstSlide = track.querySelector(".myswiper, .swiper-slide");
      if (!firstSlide) return 300;
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.gap) || 20;
      return firstSlide.offsetWidth + gap;
    };
    const updateButtonStates = () => {
      if (!prevBtn || !nextBtn) return;
      const maxScrollLeft = track.scrollWidth - track.clientWidth - 5;
      prevBtn.disabled = track.scrollLeft <= 5;
      nextBtn.disabled = track.scrollLeft >= maxScrollLeft;
    };
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        track.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        track.scrollBy({ left: getScrollStep(), behavior: "smooth" });
      });
    }
    track.addEventListener("scroll", updateButtonStates, { passive: true });
    window.addEventListener("resize", updateButtonStates, { passive: true });
    updateButtonStates();
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        track.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        track.scrollBy({ left: getScrollStep(), behavior: "smooth" });
        e.preventDefault();
      }
    });
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    track.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button, a")) return;
      isDown = true;
      track.setPointerCapture(e.pointerId);
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
    const stopDragging = (e) => {
      if (isDown) {
        isDown = false;
        try {
          track.releasePointerCapture(e.pointerId);
        } catch (err) {
        }
      }
    };
    track.addEventListener("pointerup", stopDragging);
    track.addEventListener("pointercancel", stopDragging);
    initCountdowns();
  };
  var initCountdowns = () => {
    const countdownElements = document.querySelectorAll("[data-countdown-hours]");
    if (!countdownElements.length) return;
    const endTimes = Array.from(countdownElements).map((el) => {
      const hours = parseFloat(el.getAttribute("data-countdown-hours")) || 8;
      return Date.now() + hours * 3600 * 1e3;
    });
    const updateTimers = () => {
      const now = Date.now();
      countdownElements.forEach((el, index) => {
        const remainingMs = Math.max(0, endTimes[index] - now);
        const hours = Math.floor(remainingMs / (1e3 * 60 * 60));
        const minutes = Math.floor(remainingMs % (1e3 * 60 * 60) / (1e3 * 60));
        const seconds = Math.floor(remainingMs % (1e3 * 60) / 1e3);
        const formatted = `${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}m : ${String(seconds).padStart(2, "0")}s`;
        const timerSpan = el.querySelector(".timer-text");
        if (timerSpan) {
          timerSpan.textContent = formatted;
        }
      });
    };
    updateTimers();
    setInterval(updateTimers, 1e3);
  };

  // src/js/data/nfts.js
  var NFT_CATALOG = [
    {
      id: "nft-1",
      title: "Hamlet Contemplates Yorick's Skull",
      category: "art",
      image: "./assets/img/post/Rectangle 62.png",
      creator: {
        name: "Andy Hurlbutt",
        avatar: "./assets/img/profile/Andy Hurlbutt.jpg",
        verified: true,
        chain: "BSC"
      },
      currentBidEth: 4.89,
      currentBidUsd: 12246,
      likes: 104,
      countdownHours: 8,
      isLive: true
    },
    {
      id: "nft-2",
      title: "Cybernetic Astronaut Odyssey",
      category: "virtual",
      image: "./assets/img/post/Rectangle 63.png",
      creator: {
        name: "Dan Salahi",
        avatar: "./assets/img/profile/Dan Salahi.jpg",
        verified: true,
        chain: "ETH"
      },
      currentBidEth: 3.45,
      currentBidUsd: 8625,
      likes: 182,
      countdownHours: 14,
      isLive: true
    },
    {
      id: "nft-3",
      title: "Synthesizer Echoes #08",
      category: "music",
      image: "./assets/img/post/Rectangle 64.png",
      creator: {
        name: "Harper Wilcher",
        avatar: "./assets/img/profile/Harper Wilcher.jpg",
        verified: true,
        chain: "BSC"
      },
      currentBidEth: 2.15,
      currentBidUsd: 5375,
      likes: 95,
      countdownHours: 5,
      isLive: true
    },
    {
      id: "nft-4",
      title: "Decentralized Dominion.eth",
      category: "domain",
      image: "./assets/img/post/Rectangle 65.png",
      creator: {
        name: "Blake Banks",
        avatar: "./assets/img/profile/Blake Banks.jpg",
        verified: false,
        chain: "ETH"
      },
      currentBidEth: 6.2,
      currentBidUsd: 15500,
      likes: 210,
      countdownHours: 19,
      isLive: true
    },
    {
      id: "nft-5",
      title: "Ethereal Monster Genesis",
      category: "collectibles",
      image: "./assets/img/post/Rectangle 66.png",
      creator: {
        name: "Sina Sangiji",
        avatar: "./assets/img/profile/Sina Sangiji.jpg",
        verified: true,
        chain: "BSC"
      },
      currentBidEth: 5.75,
      currentBidUsd: 14375,
      likes: 340,
      countdownHours: 11,
      isLive: true
    },
    {
      id: "nft-6",
      title: "Cyberpunk Metropolis #104",
      category: "virtual",
      image: "./assets/img/post/Rectangle 67.png",
      creator: {
        name: "Matt Ramos",
        avatar: "./assets/img/profile/Matt Ramos.jpg",
        verified: true,
        chain: "ETH"
      },
      currentBidEth: 1.85,
      currentBidUsd: 4625,
      likes: 88,
      countdownHours: 6,
      isLive: true
    },
    {
      id: "nft-7",
      title: "Neon Skull Dimension #7",
      category: "art",
      image: "./assets/img/post/Rectangle 68.png",
      creator: {
        name: "Monica Lucas",
        avatar: "./assets/img/profile/Monica Lucas.jpg",
        verified: true,
        chain: "BSC"
      },
      currentBidEth: 3.9,
      currentBidUsd: 9750,
      likes: 156,
      countdownHours: 9,
      isLive: true
    },
    {
      id: "nft-8",
      title: "Cosmic Melodies Audio Wave",
      category: "music",
      image: "./assets/img/post/Rectangle 61.png",
      creator: {
        name: "Tommy Alvarez",
        avatar: "./assets/img/profile/Tommy Alvarez.jpg",
        verified: false,
        chain: "ETH"
      },
      currentBidEth: 2.8,
      currentBidUsd: 7e3,
      likes: 118,
      countdownHours: 22,
      isLive: true
    }
  ];

  // src/js/modules/search-filter.js
  var initSearchFilter = () => {
    const gridContainer = document.querySelector("#todays-picks-grid");
    const searchInput = document.querySelector("#search");
    const filterTabs = document.querySelectorAll(".today__filter-bar .filter-tab");
    const liveAnnouncer = document.querySelector("#a11y-announcer");
    if (!gridContainer) return;
    const updateCategoryCounts = () => {
      const counts = {
        all: NFT_CATALOG.length,
        art: 0,
        music: 0,
        domain: 0,
        virtual: 0,
        collectibles: 0
      };
      NFT_CATALOG.forEach((item) => {
        if (counts[item.category] !== void 0) {
          counts[item.category]++;
        }
      });
      filterTabs.forEach((tab) => {
        const cat = tab.getAttribute("data-category");
        const badge = tab.querySelector(".tab-count");
        if (badge && counts[cat] !== void 0) {
          badge.textContent = counts[cat];
        }
      });
    };
    const renderGrid = (items) => {
      gridContainer.innerHTML = "";
      if (items.length === 0) {
        gridContainer.innerHTML = `
        <div class="today__empty" role="status">
          <div class="empty-icon">\u{1F50D}</div>
          <h3>No matching NFTs found</h3>
          <p>We couldn't find any items matching your current search or category filter. Try clearing filters to see all available art.</p>
          <button type="button" class="clear-search-btn" id="clear-search-filters-btn">Clear All Filters</button>
        </div>
      `;
        const clearBtn = document.querySelector("#clear-search-filters-btn");
        if (clearBtn) {
          clearBtn.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            store.setState({ searchQuery: "", activeCategory: "all" });
            setActiveTab("all");
            if (searchInput) searchInput.focus();
          });
        }
        if (liveAnnouncer) {
          liveAnnouncer.textContent = "No NFTs found matching your criteria.";
        }
        return;
      }
      const likedIds = store.getState().likedIds;
      const cardsHTML = items.map((item) => {
        const isLiked = likedIds.has(item.id);
        const displayLikes = isLiked ? item.likes + 1 : item.likes;
        return `
        <article class="today__card" data-id="${item.id}" data-category="${item.category}">
          <div class="today__card--image">
            <img src="${item.image}" alt="${escapeHTML2(item.title)} artwork" loading="lazy" />
            <span class="category-tag">${item.category}</span>
          </div>

          <h3 class="today__card--title" title="${escapeHTML2(item.title)}">${escapeHTML2(item.title)}</h3>

          <div class="today__card--profile">
            <figure class="creator-avatar">
              <img src="${item.creator.avatar}" alt="${escapeHTML2(item.creator.name)} avatar" loading="lazy" />
            </figure>
            <div class="creator-details">
              <p class="creator-role">Creator</p>
              <p class="creator-name">${escapeHTML2(item.creator.name)}</p>
            </div>
            <span class="chain-badge">${item.creator.chain}</span>
          </div>

          <div class="today__card--bid">
            <div class="bid-amount">
              <p class="bid-label">Current Bid</p>
              <p class="bid-value">${item.currentBidEth} ETH <span class="bid-usd">= $${item.currentBidUsd.toLocaleString()}</span></p>
            </div>
            <div class="card-actions">
              <button type="button" class="like-btn ${isLiked ? "liked" : ""}" data-id="${item.id}" aria-label="Like ${escapeHTML2(item.title)}, currently ${displayLikes} likes">
                <svg viewBox="0 0 24 24" fill="${isLiked ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span class="like-count">${displayLikes}</span>
              </button>
            </div>
          </div>
        </article>
      `;
      }).join("");
      gridContainer.innerHTML = cardsHTML;
      if (liveAnnouncer) {
        liveAnnouncer.textContent = `Showing ${items.length} NFT item${items.length === 1 ? "" : "s"}.`;
      }
    };
    const applyFilters = () => {
      const { activeCategory, searchQuery } = store.getState();
      const query = searchQuery.trim().toLowerCase();
      const filtered = NFT_CATALOG.filter((item) => {
        const matchesCategory = activeCategory === "all" || item.category === activeCategory;
        const matchesQuery = query === "" || item.title.toLowerCase().includes(query) || item.creator.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
      });
      renderGrid(filtered);
    };
    const setActiveTab = (category) => {
      filterTabs.forEach((tab) => {
        const isTarget = tab.getAttribute("data-category") === category;
        tab.classList.toggle("active", isTarget);
        tab.setAttribute("aria-selected", isTarget ? "true" : "false");
      });
    };
    filterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const category = tab.getAttribute("data-category");
        store.setState({ activeCategory: category });
        setActiveTab(category);
        applyFilters();
      });
    });
    let debounceTimer = null;
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          store.setState({ searchQuery: e.target.value });
          applyFilters();
        }, 200);
      });
      searchInput.addEventListener("search", () => {
        store.setState({ searchQuery: searchInput.value });
        applyFilters();
      });
    }
    store.subscribe("likedIds", () => {
      applyFilters();
    });
    updateCategoryCounts();
    applyFilters();
  };
  function escapeHTML2(str) {
    return str.replace(
      /[&<>'"]/g,
      (tag) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[tag] || tag
    );
  }

  // src/js/modules/wallet-modal.js
  var MOCK_ADDRESSES = {
    metamask: "0x71C...49bE",
    coinbase: "0x3A8...92F1",
    walletconnect: "0xE42...17c0"
  };
  var initWalletModal = () => {
    const openBtn = document.querySelector("#wallet-connect-btn");
    const dialog = document.querySelector("#wallet-modal");
    const closeBtn = document.querySelector("#modal-close-btn");
    const providerButtons = document.querySelectorAll(".modal-dialog__provider-btn");
    const statusEl = document.querySelector("#wallet-modal-status");
    if (!dialog) return;
    const openModal = () => {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
      if (closeBtn) closeBtn.focus();
      updateModalUI();
    };
    const closeModal = () => {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
      if (openBtn) openBtn.focus();
    };
    const updateModalUI = () => {
      const { wallet } = store.getState();
      providerButtons.forEach((btn) => {
        const provider = btn.getAttribute("data-provider");
        const isConnected = wallet.isConnected && wallet.provider === provider;
        btn.classList.toggle("connected", isConnected);
        const badge = btn.querySelector(".provider-badge");
        if (badge) {
          badge.textContent = isConnected ? "Connected" : "Connect";
        }
      });
      if (statusEl) {
        if (wallet.isConnected) {
          statusEl.textContent = `Connected via ${wallet.provider} (${wallet.address}). Click again to disconnect.`;
        } else {
          statusEl.textContent = "Choose your preferred wallet provider to connect.";
        }
      }
    };
    if (openBtn) {
      openBtn.addEventListener("click", openModal);
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        closeModal();
      }
    });
    dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      closeModal();
    });
    providerButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const provider = btn.getAttribute("data-provider");
        const currentWallet = store.getState().wallet;
        if (currentWallet.isConnected && currentWallet.provider === provider) {
          store.setState({
            wallet: { isConnected: false, address: null, provider: null }
          });
          showToast(`Disconnected from ${provider}`, "info");
        } else {
          btn.disabled = true;
          const originalText = btn.querySelector(".provider-badge").textContent;
          btn.querySelector(".provider-badge").textContent = "Connecting...";
          setTimeout(() => {
            btn.disabled = false;
            const address = MOCK_ADDRESSES[provider] || "0x123...4567";
            store.setState({
              wallet: { isConnected: true, address, provider }
            });
            showToast(`Connected to ${provider} (${address})`, "success");
            closeModal();
          }, 600);
        }
        updateModalUI();
      });
    });
    store.subscribe("wallet", (wallet) => {
      if (!openBtn) return;
      const btnText = openBtn.querySelector(".wallet-btn-text");
      if (wallet.isConnected) {
        openBtn.classList.add("connected");
        if (btnText) {
          btnText.textContent = wallet.address;
        }
      } else {
        openBtn.classList.remove("connected");
        if (btnText) {
          btnText.textContent = "Wallet Connect";
        }
      }
    });
  };

  // src/js/modules/likes.js
  var STORAGE_KEY2 = "axies_liked_ids";
  var initLikes = () => {
    document.addEventListener("click", (e) => {
      const likeBtn = e.target.closest(".like-btn");
      if (!likeBtn) return;
      e.preventDefault();
      const id = likeBtn.getAttribute("data-id");
      if (!id) return;
      const likedIds = new Set(store.getState().likedIds);
      const countSpan = likeBtn.querySelector(".like-count");
      let currentCount = countSpan ? parseInt(countSpan.textContent, 10) || 0 : 0;
      if (likedIds.has(id)) {
        likedIds.delete(id);
        likeBtn.classList.remove("liked");
        if (countSpan) countSpan.textContent = Math.max(0, currentCount - 1);
        likeBtn.setAttribute("aria-label", `Like artwork, currently ${Math.max(0, currentCount - 1)} likes`);
        showToast("Removed from favorites", "info", 1500);
      } else {
        likedIds.add(id);
        likeBtn.classList.add("liked");
        if (countSpan) countSpan.textContent = currentCount + 1;
        likeBtn.setAttribute("aria-label", `Unlike artwork, currently ${currentCount + 1} likes`);
        showToast("Added to favorites!", "success", 1500);
      }
      try {
        localStorage.setItem(STORAGE_KEY2, JSON.stringify(Array.from(likedIds)));
      } catch (err) {
        console.warn("Could not persist liked items", err);
      }
      store.setState({ likedIds });
    });
  };

  // src/js/modules/newsletter.js
  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var initNewsletter = () => {
    const form = document.querySelector("#newsletter-form");
    const emailInput = document.querySelector("#newsletter-email");
    const feedback = document.querySelector("#newsletter-feedback");
    if (!form || !emailInput) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email) {
        setFeedback("Please enter your email address.", "error");
        emailInput.focus();
        return;
      }
      if (!EMAIL_REGEX.test(email)) {
        setFeedback("Please enter a valid email address.", "error");
        emailInput.focus();
        return;
      }
      setFeedback("Thank you for subscribing to Axies!", "success");
      showToast("Subscribed to Axies newsletter!", "success");
      emailInput.value = "";
      setTimeout(() => {
        if (feedback) feedback.textContent = "";
      }, 4e3);
    });
    const setFeedback = (msg, type) => {
      if (feedback) {
        feedback.textContent = msg;
        feedback.className = `newsletter-feedback ${type}`;
      }
    };
  };

  // src/js/main.js
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavigation();
    initCarousel();
    initSearchFilter();
    initWalletModal();
    initLikes();
    initNewsletter();
    const splashScreen = document.querySelector(".splash-screen");
    if (splashScreen) {
      setTimeout(() => {
        splashScreen.classList.add("hidden");
      }, 200);
    }
  });
})();

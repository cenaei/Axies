/**
 * Axies Catalog Search & Category Filter
 * Real-time debounced filtering, category tabs, count badges, and empty states
 */

import { NFT_CATALOG } from "../data/nfts.js";
import { store } from "../state/store.js";

export const initSearchFilter = () => {
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
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });

    filterTabs.forEach((tab) => {
      const cat = tab.getAttribute("data-category");
      const badge = tab.querySelector(".tab-count");
      if (badge && counts[cat] !== undefined) {
        badge.textContent = counts[cat];
      }
    });
  };

  const renderGrid = (items) => {
    gridContainer.innerHTML = "";

    if (items.length === 0) {
      gridContainer.innerHTML = `
        <div class="today__empty" role="status">
          <div class="empty-icon">🔍</div>
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
            <img src="${item.image}" alt="${escapeHTML(item.title)} artwork" loading="lazy" />
            <span class="category-tag">${item.category}</span>
          </div>

          <h3 class="today__card--title" title="${escapeHTML(item.title)}">${escapeHTML(item.title)}</h3>

          <div class="today__card--profile">
            <figure class="creator-avatar">
              <img src="${item.creator.avatar}" alt="${escapeHTML(item.creator.name)} avatar" loading="lazy" />
            </figure>
            <div class="creator-details">
              <p class="creator-role">Creator</p>
              <p class="creator-name">${escapeHTML(item.creator.name)}</p>
            </div>
            <span class="chain-badge">${item.creator.chain}</span>
          </div>

          <div class="today__card--bid">
            <div class="bid-amount">
              <p class="bid-label">Current Bid</p>
              <p class="bid-value">${item.currentBidEth} ETH <span class="bid-usd">= $${item.currentBidUsd.toLocaleString()}</span></p>
            </div>
            <div class="card-actions">
              <button type="button" class="like-btn ${isLiked ? 'liked' : ''}" data-id="${item.id}" aria-label="Like ${escapeHTML(item.title)}, currently ${displayLikes} likes">
                <svg viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
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
      liveAnnouncer.textContent = `Showing ${items.length} NFT item${items.length === 1 ? '' : 's'}.`;
    }
  };

  const applyFilters = () => {
    const { activeCategory, searchQuery } = store.getState();
    const query = searchQuery.trim().toLowerCase();

    const filtered = NFT_CATALOG.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesQuery = query === "" || 
        item.title.toLowerCase().includes(query) ||
        item.creator.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

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

  // Category Tab Click Listeners
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.getAttribute("data-category");
      store.setState({ activeCategory: category });
      setActiveTab(category);
      applyFilters();
    });
  });

  // Debounced Search Input
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

  // Subscribe to likedIds changes so grid stays synchronized
  store.subscribe("likedIds", () => {
    applyFilters();
  });

  updateCategoryCounts();
  applyFilters();
};

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

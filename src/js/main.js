/**
 * Axies NFT Marketplace - Main Application Entrypoint (Source)
 */

import { initTheme } from "./modules/theme.js";
import { initNavigation } from "./modules/navigation.js";
import { initCarousel } from "./modules/carousel.js";
import { initSearchFilter } from "./modules/search-filter.js";
import { initWalletModal } from "./modules/wallet-modal.js";
import { initLikes } from "./modules/likes.js";
import { initNewsletter } from "./modules/newsletter.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Theme (Dark/Light tokens)
  initTheme();

  // 2. Initialize Accessible Navigation (Mobile drawer & Desktop keyboard dropdowns)
  initNavigation();

  // 3. Initialize Accessible Live Auctions Carousel
  initCarousel();

  // 4. Initialize Search & Category Filter System
  initSearchFilter();

  // 5. Initialize Accessible Wallet Modal
  initWalletModal();

  // 6. Initialize Optimistic Likes
  initLikes();

  // 7. Initialize Newsletter Subscription
  initNewsletter();

  // 8. Gracefully dismiss splash screen
  const splashScreen = document.querySelector(".splash-screen");
  if (splashScreen) {
    setTimeout(() => {
      splashScreen.classList.add("hidden");
    }, 200);
  }
});

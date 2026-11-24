/**
 * Axies Navigation & Accessibility Controller
 */

export const initNavigation = () => {
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

  // Close mobile nav when clicking any nav link
  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileNav);
    });
  }

  // Keyboard Escape listener
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (mobileNav && mobileNav.classList.contains("active")) {
        closeMobileNav();
      }
    }
  });

  // Desktop dropdown keyboard support
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

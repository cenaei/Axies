/**
 * Axies Theme Controller
 * Supports System Preference, Manual Override, and Persistent Local Storage
 * Powered by CoolThemeSwitch Day/Night Toggle
 */

import { store } from "../state/store.js";
import { showToast } from "./toast.js";

const STORAGE_KEY = "axies_theme_preference";

export const initTheme = () => {
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

  // Listen to OS theme changes if user hasn't explicitly set a preference
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

  // Initial application
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme, false);
};

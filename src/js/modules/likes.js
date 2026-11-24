/**
 * Axies Optimistic Like System
 * Handles like/unlike toggling with localStorage persistence and tactile animations
 */

import { store } from "../state/store.js";
import { showToast } from "./toast.js";

const STORAGE_KEY = "axies_liked_ids";

export const initLikes = () => {
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

    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(likedIds)));
    } catch (err) {
      console.warn("Could not persist liked items", err);
    }

    store.setState({ likedIds });
  });
};

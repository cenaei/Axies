/**
 * Axies Accessible Carousel Engine
 * Touch-enabled, keyboard-operable, responsive zero-dependency slider
 */

export const initCarousel = () => {
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

  // Keyboard navigation when carousel or its children have focus
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      track.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      track.scrollBy({ left: getScrollStep(), behavior: "smooth" });
      e.preventDefault();
    }
  });

  // Touch and pointer drag functionality
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button, a")) return; // Don't drag on buttons
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
      } catch (err) {}
    }
  };

  track.addEventListener("pointerup", stopDragging);
  track.addEventListener("pointercancel", stopDragging);

  // Initialize countdown timers
  initCountdowns();
};

const initCountdowns = () => {
  const countdownElements = document.querySelectorAll("[data-countdown-hours]");
  if (!countdownElements.length) return;

  const endTimes = Array.from(countdownElements).map((el) => {
    const hours = parseFloat(el.getAttribute("data-countdown-hours")) || 8;
    return Date.now() + hours * 3600 * 1000;
  });

  const updateTimers = () => {
    const now = Date.now();
    countdownElements.forEach((el, index) => {
      const remainingMs = Math.max(0, endTimes[index] - now);
      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

      const formatted = `${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}m : ${String(seconds).padStart(2, "0")}s`;
      const timerSpan = el.querySelector(".timer-text");
      if (timerSpan) {
        timerSpan.textContent = formatted;
      }
    });
  };

  updateTimers();
  setInterval(updateTimers, 1000);
};

/**
 * Axies Newsletter Subscription Controller
 * Accessible email validation, live feedback, and toast notification
 */

import { showToast } from "./toast.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const initNewsletter = () => {
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

    // Success simulation
    setFeedback("Thank you for subscribing to Axies!", "success");
    showToast("Subscribed to Axies newsletter!", "success");
    emailInput.value = "";

    setTimeout(() => {
      if (feedback) feedback.textContent = "";
    }, 4000);
  });

  const setFeedback = (msg, type) => {
    if (feedback) {
      feedback.textContent = msg;
      feedback.className = `newsletter-feedback ${type}`;
    }
  };
};

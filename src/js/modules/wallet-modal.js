/**
 * Axies Accessible Wallet Connection Modal Controller
 * Focus-trapped HTML5 dialog, simulated Web3 connection state, and provider management
 */

import { store } from "../state/store.js";
import { showToast } from "./toast.js";

const MOCK_ADDRESSES = {
  metamask: "0x71C...49bE",
  coinbase: "0x3A8...92F1",
  walletconnect: "0xE42...17c0"
};

export const initWalletModal = () => {
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

  // Backdrop click dismissal
  dialog.addEventListener("click", (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeModal();
    }
  });

  // ESC key
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeModal();
  });

  // Provider button clicks
  providerButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const provider = btn.getAttribute("data-provider");
      const currentWallet = store.getState().wallet;

      if (currentWallet.isConnected && currentWallet.provider === provider) {
        // Disconnect
        store.setState({
          wallet: { isConnected: false, address: null, provider: null }
        });
        showToast(`Disconnected from ${provider}`, "info");
      } else {
        // Simulate connecting state
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

  // Update header button when wallet state changes
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

/**
 * Axies State Store
 * Centralized observable reactive state
 */

class Store {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = new Map();
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
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(listener);

    return () => {
      this.listeners.get(key).delete(listener);
    };
  }
}

// Initialize persisted liked IDs from localStorage safely
const getInitialLikedIds = () => {
  try {
    const saved = localStorage.getItem("axies_liked_ids");
    return saved ? new Set(JSON.parse(saved)) : new Set(["nft-1", "nft-4"]);
  } catch (e) {
    return new Set(["nft-1", "nft-4"]);
  }
};

export const store = new Store({
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

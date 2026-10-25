import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";

const STORAGE_KEY = "eleganza_state";

// Load the saved state (localStorage)
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
  preloadedState: loadState(),
});

// Save the state at every change
store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
  } catch {
    /* ignore */
  }
});

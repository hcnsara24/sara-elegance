import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: [] },
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavoriteIds = (state) => state.favorites.ids;

export default favoritesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export function setWishlistDataToStorage(state) {
  localStorage.setItem("wlData", JSON.stringify(state));
}

const initialState = {
  count: 0,
  modalState: false,
  modalData: JSON.parse(localStorage.getItem("wlData")) || [],
};

const WishlistSlice = createSlice({
  name: "Wishlist/Slice",
  initialState,
  reducers: {
    handleCount(state) {
      state.count += 1;
    },
    handleWishlistState(state, action) {
      state.modalState = action.payload;
    },
    handleWishlistData(state, action) {
      if (state.modalData.find((item) => item.id === action.payload.id)) {
        state.modalData = state.modalData.filter(
          (item) => item.id !== action.payload.id
        );
        state.count -= 1;
      } else {
        state.modalData.push(action.payload);
        state.count += 1;
      }
      setWishlistDataToStorage(state.modalData);
    },
    getWishlistDataFromStorage(state) {
      const data = JSON.parse(localStorage.getItem("wlData"));
      if (data) {
        state.modalData = data;
        state.count = data.length;
      }
    },
    addToWishlist(state, action) {
      state.modalData.push(action.payload);
      state.count += 1;
      setWishlistDataToStorage(state.modalData);
    },
    removeFromWishlist(state, action) {
      state.modalData = state.modalData.filter(
        (item) => item.id !== action.payload
      );
      state.count = state.modalData.length;
      setWishlistDataToStorage(state.modalData);
    },
  },
});

export const {
  handleCount,
  handleWishlistState,
  handleWishlistData,
  getWishlistDataFromStorage,
  addToWishlist,
  removeFromWishlist,
} = WishlistSlice.actions;

export const getWishlistCount = (state) => state.WishlistSlice.count;
export const getWishlistModalState = (state) => state.WishlistSlice.modalState;
export const getWishlistModalData = (state) => state.WishlistSlice.modalData;

export const isProductInWishlist = (state, productId) => {
  return state.WishlistSlice.modalData.some((item) => item.id === productId);
};

export default WishlistSlice.reducer;

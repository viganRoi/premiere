import { createSlice } from '@reduxjs/toolkit';
import { fetchGalleryUrl } from './GalleryApi';
const initialState = {
    images: [],
    loading: false,
    msg: '',
    status: 'idle',
    error: null,
};

const GallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        // Add your reducer functions here
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGalleryUrl.pending, (state, action) => {
            state.loading = true;
            state.status = 'pending';
        })
        .addCase(fetchGalleryUrl.fulfilled, (state, action) => {
            state.loading = false;
            state.status = 'fulfilled';
            state.images = action.payload;
        })
        .addCase(fetchGalleryUrl.rejected, (state, action) => {
            state.loading = false;
            state.status = 'rejected';
            state.error = action.error.message;
        })
    }

});

export const {  } = GallerySlice.actions;
export const getGalleryUrl = state => state.GallerySlice.images;
export const getGalleryLoading = state => state.GallerySlice.loading;
export const getGalleryStatus = state => state.GallerySlice.status;
export const getGalleryError = state => state.GallerySlice.error;
export const getGalleryMsg = state => state.GallerySlice.msg;
export default GallerySlice.reducer;
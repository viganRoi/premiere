import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCommercialStoreAndBuilding, fetchAllCommercialStoreByBuilding, updateCommercialStore } from './CommercialStoreApi';

const initialState = {
    commercialStores: [],
    loading: false,
    status: 'idle',
    msg: '',
    error: null,
    editModalOpen: false,
    editModalData: null,
};

const CommercialStoreSlice = createSlice({
    name: 'commercialStore',
    initialState,
    reducers: {
        fetchCommercialStoresStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCommercialStoresSuccess(state, action) {
            state.commercialStores = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchCommercialStoresFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        setCommercialStoreEditModalState(state, action) {
            state.editModalOpen = action.payload;
        },
        setCommercialStoreEditModalData(state, action) {
            state.editModalData = action.payload;
        },
        resetCommercialStoreMsgAndStatus(state) {
            state.status = 'idle';
            state.error = null;
            state.msg = '';
        },
    },
    extraReducers: (builder) => {
        builder
         .addCase(fetchAllCommercialStoreByBuilding.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(fetchAllCommercialStoreByBuilding.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.commercialStores = action.payload;
        })
        .addCase(fetchAllCommercialStoreByBuilding.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
            state.msg = action.payload
        })
        .addCase(fetchAllCommercialStoreAndBuilding.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(fetchAllCommercialStoreAndBuilding.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.commercialStores = action.payload;
        })
        .addCase(fetchAllCommercialStoreAndBuilding.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
            state.msg = action.payload
        })
        .addCase(updateCommercialStore.pending, (state) => {
            state.status = 'update_pending';
        })
        .addCase(updateCommercialStore.fulfilled, (state, action) => {
            state.status = 'update_fulfilled';
            state.msg = action.payload;
        })
        .addCase(updateCommercialStore.rejected, (state, action) => {
            state.status = 'update_rejected';
            state.error = action.error.message;
            state.msg = action.payload
        })
    }
});

export const {
    fetchCommercialStoresStart,
    fetchCommercialStoresSuccess,
    fetchCommercialStoresFailure,
    setCommercialStoreEditModalState,
    setCommercialStoreEditModalData,
    resetCommercialStoreMsgAndStatus
} = CommercialStoreSlice.actions;

export const getCommercialStoresData = (state) => state.CommercialStoreSlice.commercialStores;
export const getCommercialStoreLoading = (state) => state.CommercialStoreSlice.loading;
export const getCommercialStoreError = (state) => state.CommercialStoreSlice.error;
export const getCommercialStoreStatus = (state) => state.CommercialStoreSlice.status;
export const getCommercialStoreEditModalState = (state) => state.CommercialStoreSlice.editModalOpen;
export const getCommercialStoreEditModalData = (state) => state.CommercialStoreSlice.editModalData;
export const getCommercialStoreMsg = (state) => state.CommercialStoreSlice.msg;

export default CommercialStoreSlice.reducer;
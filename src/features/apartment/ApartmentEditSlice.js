import { createSlice } from "@reduxjs/toolkit"
import { updateApartment, updateApartmentId } from "./ApartmentAPI";

const initialState = {
    data: {},
    modalState: false,
    status: 'idle',
    msg: '',
    galleryModalOpen: false,
    galleryModalApartmentId: null,
}

const ApartmentEditSlice = createSlice({
    name: 'ApartmentEditSlice',
    initialState,
    reducers: {
        setApartmentEditData(state, action) {
            state.data = action.payload;
        },
        setApartmentEditModalState(state, action) {
            state.modalState = action.payload;
        },
        resetStatusAndMsg(state) {
            state.msg = '';
            state.status = 'idle';
        },
        setGalleryModalData(state, action) {
            state.galleryModalOpen = action.payload.open;
            state.galleryModalApartmentId = action.payload.apartmentId;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateApartment.pending , (state, action) => {
                    state.status = 'updateApartment_pending'
                })  
               .addCase(updateApartment.fulfilled , (state, action) => {
                    state.status = 'updateApartment_success';
                    
               })
               .addCase(updateApartment.rejected , (state, action) => {
                    state.status = 'updateApartment_rejected'
               })

               .addCase(updateApartmentId.pending , (state, action) => {
                    state.status = 'updateApartmentId_pending'
                })
                .addCase(updateApartmentId.fulfilled , (state, action) => {
                      state.status = 'updateApartmentId_success';
                })
                .addCase(updateApartmentId.rejected , (state, action) => {
                      state.status = 'updateApartmentId_rejected'
                      state.msg = action.payload;
                })
    }
})
export const {
    
    setApartmentEditData,
    setApartmentEditModalState,
    resetStatusAndMsg,
    setGalleryModalData,

} = ApartmentEditSlice.actions;
export const getApartmentEditData = (state) => state.ApartmentEditSlice.data;
export const getApartmentEditModalState = (state) => state.ApartmentEditSlice.modalState;
export const getApartmentEditStatus = (state) => state.ApartmentEditSlice.status;
export const getApartmentEditMsg = (state) => state.ApartmentEditSlice.msg;
export const getGalleryModalState = (state) => state.ApartmentEditSlice.galleryModalOpen;
export const getGalleryModalApartmentId = (state) => state.ApartmentEditSlice.galleryModalApartmentId;

export default ApartmentEditSlice.reducer;
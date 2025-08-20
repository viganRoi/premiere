import { createSlice } from "@reduxjs/toolkit";
import { fetchApartmentAllData, fetchApartmentsAll, fetchApartmentsAllOrderByApartmentId, getAllApartmentsByFloorId, getApartmentById, getApartmentsSvgDataAll, getFloorByBuilding, getFloorById, getFloorSelectionSvg, getObjectSvgDataAll } from "./ApartmentAPI";

const initialState = {
    apartmentUrlParamId: '',
    apartmentDetailModalState: false,
    apartmentDetailModalData: {},
    apartmentSvgData: [],
    floorSvgData: [],
    allFloorsSvg: [],
    apartmentAndBuildingData: [],
    status: 'idle',
    floorStatus: 'idle',
    msg: '',
    apartmentIdModalState: false,
    apartmentIdModalId: null,
    apartmentIdModalApartmentId: null,
    allData: [],
    floorApartmentsSvgData: null,
}

const ApartmentSlice = createSlice({
    name: 'ApartmentSlice',
    initialState,
    reducers: {
        setApartmentUrlParamId: (state, action) => {
            state.apartmentUrlParamId = action.payload;
        },
        setApartmentDetailModalState(state, action) {
            state.apartmentDetailModalState = action.payload;
        },
        setApartmentDetailModalData(state, action) {
            state.apartmentDetailModalData = action.payload;
        },
        resetStatusAndMsg(state) {
            state.msg = '';
            state.status = 'idle';
        },
        resetApartmentsData(state) {
            state.apartmentAndBuildingData = [];
            state.apartmentSvgData = []
        },
        setApartmentIdModalState(state, action) {
            state.apartmentIdModalState = action.payload;
        },
        setApartmentIdModalId(state, action) {
            state.apartmentIdModalId = action.payload;
        },
        setApartmentIdModalApartmentId(state, action) {
            state.apartmentIdModalApartmentId = action.payload;
        },
        updateBuildingData(state, action) {
            state.apartmentSvgData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
                .addCase(getObjectSvgDataAll.pending , (state) => {
                    state.status = 'pending';
                })
               .addCase(getObjectSvgDataAll.fulfilled , (state, action) => {
                    state.status = 'success';
                    state.apartmentSvgData = action.payload;
               })
               .addCase(getObjectSvgDataAll.rejected , (state, action) => {
                    state.status = 'rejected';
                    state.msg = action.payload;
               })

               // getApartmentById
               .addCase(getApartmentById.pending , (state) => {
                state.status = 'pending';
                })
                .addCase(getApartmentById.fulfilled , (state, action) => {
                    state.status = 'success';
                    state.apartmentDetailModalData = action.payload;
                })
                .addCase(getApartmentById.rejected , (state, action) => {
                    state.status = 'rejected';
                    state.msg = action.payload;
                })

                // getApartmentsSvgDataAll
               .addCase(getApartmentsSvgDataAll.pending , (state) => {
                    state.status = 'pending';
               })
               .addCase(getApartmentsSvgDataAll.fulfilled , (state, action) => {
                    state.status = 'success';
                    state.apartmentAndBuildingData = action.payload;
               })
               .addCase(getApartmentsSvgDataAll.rejected , (state, action) => {
                    state.status = 'rejected';
                    state.msg = action.payload;
               })

               // getApartmentsSvgDataAll
                .addCase(getAllApartmentsByFloorId.pending , (state) => {
                    state.status = 'pending';
                    })
                .addCase(getAllApartmentsByFloorId.fulfilled , (state, action) => {
                        state.status = 'success';
                        state.floorSvgData = action.payload;
                })
                .addCase(getAllApartmentsByFloorId.rejected , (state, action) => {
                        state.status = 'rejected';
                        state.msg = action.payload;
                })


               .addCase(fetchApartmentAllData.pending , (state) => {  
                    state.status = 'pending';
               })
                .addCase(fetchApartmentAllData.fulfilled , (state, action) => {
                      state.status = 'success';
                      state.allData = action.payload;
                })
                .addCase(fetchApartmentAllData.rejected , (state, action) => {
                      state.status = 'rejected';
                      state.msg = action.payload;
                })
                .addCase(fetchApartmentsAllOrderByApartmentId.pending , (state) => {  
                    state.status = 'pending';
               })
                .addCase(fetchApartmentsAllOrderByApartmentId.fulfilled , (state, action) => {
                      state.status = 'success';
                      state.allData = action.payload;
                })
                .addCase(fetchApartmentsAllOrderByApartmentId.rejected , (state, action) => {
                      state.status = 'rejected';
                      state.msg = action.payload;
                })
                .addCase(fetchApartmentsAll.pending , (state) => {
                    state.status = 'pending';
                })
                .addCase(fetchApartmentsAll.fulfilled , (state, action) => {
                    state.status = 'success';
                    state.apartmentSvgData = action.payload;
                })
                .addCase(fetchApartmentsAll.rejected , (state, action) => {
                    state.status = 'rejected';
                    state.msg = action.payload;
                })
                .addCase(getFloorSelectionSvg.pending, (state, action) => {

                })
                .addCase(getFloorSelectionSvg.fulfilled, (state, action) => {
                    state.allFloorsSvg = action.payload;
                })
                .addCase(getFloorSelectionSvg.rejected, (state, action) => {

                })
                .addCase(getFloorById.pending, (state, action) => {
                    state.status = 'pending';
                })
                .addCase(getFloorById.fulfilled, (state, action) => {
                    state.status = 'success';
                    state.floorApartmentsSvgData = action.payload;
                })
                .addCase(getFloorById.rejected, (state, action) => {
                    state.status = 'rejected';
                    state.msg = action.payload;
                })
                .addCase(getFloorByBuilding.pending, (state, action) => {
                    state.floorStatus = 'pending';
                })
                .addCase(getFloorByBuilding.fulfilled, (state, action) => {
                    state.floorStatus = 'success';
                    state.floorApartmentsSvgData = action.payload;
                })
                .addCase(getFloorByBuilding.rejected, (state, action) => {
                    state.floorStatus = 'rejected';
                    state.msg = action.payload;
                })

    }
})
export const { 

    setApartmentUrlParamId,
    setApartmentDetailModalData,
    setApartmentDetailModalState,
    resetStatusAndMsg,
    setApartmentIdModalState,
    setApartmentIdModalId,
    setApartmentIdModalApartmentId,
    updateBuildingData

} = ApartmentSlice.actions;

export const getApartmentUrlParamId = (state) => state.ApartmentSlice.apartmentUrlParamId;
export const getApartmentDetailModalState = (state) => state.ApartmentSlice.apartmentDetailModalState;
export const getApartmentDetailModalData = (state) => state.ApartmentSlice.apartmentDetailModalData;
export const getAllApartmentSvgData = (state) => state.ApartmentSlice.apartmentSvgData;
export const getFloorSvgData = (state) => state.ApartmentSlice.floorSvgData;
export const getAllBuildingAndApartmentsData = (state) => state.ApartmentSlice.apartmentAndBuildingData;
export const getApartmentStatus = (state) => state.ApartmentSlice.status;
export const getFloorStatus = (state) => state.ApartmentSlice.floorStatus;
export const getApartmentIdModalState = (state) => state.ApartmentSlice.apartmentIdModalState;
export const getApartmentIdModalId = (state) => state.ApartmentSlice.apartmentIdModalId;
export const getApartmentIdModalApartmentId = (state) => state.ApartmentSlice.apartmentIdModalApartmentId;
export const getApartmentMsg = (state) => state.ApartmentSlice.msg;
export const getApartmentAllData = (state) => state.ApartmentSlice.allData;
export const getAllFloorSvgData = (state) => state.ApartmentSlice.allFloorsSvg;
export const getFloorApartmentsSvgData = (state) => state.ApartmentSlice.floorApartmentsSvgData;

export default ApartmentSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"

export const maxFloor = 8;
export const minFloor = 1;
export const maxSquare = 250;
export const minSquare = 40;

const initialState = {
    mobileFilter: {
        modalState: false,
        rooms:['all'],
        floor: {
            startVal: 1,
            endVal: 6,
        },
        square: {
            startVal: 40,
            endVal: 300
        },
        building:['all'],
    },
    regularFilter: {
        // rooms: {
        //     startVal: 1,
        //     endVal: 6,
        // },
        rooms: ['all'],
        floor: {
            startVal: minFloor,
            endVal: maxFloor,
        },
        square: {
            startVal: minSquare,
            endVal: maxSquare
        },
        type: ['all'],
        building:['all'],
    },
    regularFilterState: false,
    regularModalFilterState: false,
    filterState: false,
}

const FilterSlice = createSlice({
    name: 'FilterSlice',
    initialState,
    reducers: {
        setMobileSquareFilter(state, action) {

        },
        setMobileFloorFilter(state, action) {

        },
        setMobileRoomFilter(state, action) {

        },
        setRegularBuildingFilter(state, action) {
            if(action.payload === 'all') {
                state.regularFilter.building = ['all'];
            }
            if(state.regularFilter.building.includes(action.payload)) {
                state.regularFilter.building = state.regularFilter.building.filter((item) => !item.includes(action.payload));
                if(state.regularFilter.building.length === 0) {
                    state.regularFilter.building.push('all');
                }
            }
            else {
                state.regularFilter.building.push(action.payload);
                state.regularFilter.building = state.regularFilter.building.filter((item) => !item.includes('all'));
            }
        },
        setMobileFilterModalState(state, action){
            state.mobileFilter.modalState = action.payload;
        },
        handleMobileFilterReset(state, action) {
            state.mobileFilter.floor.endVal = 0;
            state.mobileFilter.rooms = [];
            state.mobileFilter.building = [];
            state.mobileFilter.square = 22;
        },
        setRegularSquareFilter(state, action) {
            state.regularFilter.square.endVal = action.payload[1]
            state.regularFilter.square.startVal = action.payload[0]
        },
        setRegularFloorFilter(state, action) {
            state.regularFilter.floor.startVal = action.payload[0]
            state.regularFilter.floor.endVal = action.payload[1]
        },
        setRegularRoomFilter(state, action) {
            if(action.payload === 'all') {
                state.regularFilter.rooms = ['all']
                state.regularFilter.building = ['all']
            }
            const exists = state.regularFilter.rooms.includes(action.payload)
            if(exists) {         
                state.regularFilter.rooms = state.regularFilter.rooms.filter((item) => item !== action.payload)
                if(state.regularFilter.rooms.length === 0) {
                    state.regularFilter.rooms.push('all');
                }
            }
            else {
                state.regularFilter.rooms.push(action.payload)
                if(state.regularFilter.rooms.includes('all') && state.regularFilter.rooms.length > 1) {
                    state.regularFilter.rooms = state.regularFilter.rooms.filter((item) => item !== 'all')
                }
            }
            // state.regularFilter.rooms.startVal = action.payload[0];
            // state.regularFilter.rooms.endVal = action.payload[1];
        },
        handleRegularFilterType(state, action) {
            if(action.payload === 'all') {
                state.regularFilter.type = ['all'];
            }
            if(state.regularFilter.type.includes(action.payload)) {
                state.regularFilter.type = state.regularFilter.type.filter((item) => !item.includes(action.payload));
                if(state.regularFilter.type.length === 0) {
                    state.regularFilter.type.push('all');
                }
            }
            else {
                state.regularFilter.type.push(action.payload);
                state.regularFilter.type = state.regularFilter.type.filter((item) => !item.includes('all'));
            }
        },
        handleRegularFilterState(state, action) {
            state.regularFilterState = action.payload;
        },  
        handleRegularFilterReset(state, action) {
            state.regularFilter.floor.endVal = maxFloor
            state.regularFilter.floor.startVal = minFloor
            state.regularFilter.rooms = ['all']
            state.regularFilter.building = ['all']
            state.regularFilter.square.endVal = maxSquare
            state.regularFilter.square.startVal = minSquare
            state.regularFilter.type = ['all']
        },
        handleRegularFilterModalState(state, action) {
            state.regularModalFilterState = action.payload;
        },
        handleFilterState(state, action) {
            state.filterState = action.payload;
        }
    }
})

export const {

    setMobileFilterModalState,
    setMobileFloorFilter,
    setMobileRoomFilter,
    setMobileSquareFilter,
    setRegularFloorFilter,
    setRegularBuildingFilter,
    setRegularRoomFilter,
    setRegularSquareFilter,
    handleRegularFilterState,
    handleRegularFilterReset,
    handleMobileFilterReset,
    handleRegularFilterModalState,
    handleFilterState,
    handleRegularFilterType

} = FilterSlice.actions;
export const getMobileFilter = (state) => state.FilterSlice.mobileFilter;
export const getMobileSquareFilter = (state) => state.FilterSlice.mobileFilter.square;
export const getMobileFloorFilter = (state) => state.FilterSlice.mobileFilter.floor;
export const getMobileRoomFilter = (state) => state.FilterSlice.mobileFilter.rooms;
export const getMobileFilterModalState = (state) => state.FilterSlice.mobileFilter.modalState;
export const getRegularFilter = (state) => state.FilterSlice.regularFilter;
export const getRegularSquareFilter = (state) => state.FilterSlice.regularFilter.square;
export const getRegularBuildingFilter = (state) => state.FilterSlice.regularFilter.building;
export const getRegularRoomFilter = (state) => state.FilterSlice.regularFilter.rooms;
export const getRegularFloorFilter = (state) => state.FilterSlice.regularFilter.floor;
export const getRegularFilterState = (state) => state.FilterSlice.regularFilterState;
export const getRegularFilterModalState = (state) => state.FilterSlice.regularModalFilterState;
export const getRegularFilterType = (state) => state.FilterSlice.regularFilter.type;
export const getFilterState = (state) => state.FilterSlice.filterState;
export default FilterSlice.reducer;
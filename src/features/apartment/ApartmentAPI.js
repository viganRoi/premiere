import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/consts";
import { tokenConfig, tokenConfigContentMultipart } from "../auth/AuthSlice";

const urlObjects = `${BASE_URL}/api/apartment`;

export const getObjectSvgDataAll = createAsyncThunk(
    'ObjectsSlice/objectsgetall',
    async(page, { rejectWithValue }) => {
        try {
           const res = await axios.get(`${urlObjects}/getall/building/${page}`);
           return res.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getFloorSelectionSvg = createAsyncThunk(
    'ObjectsSlice/objectsgetallsvg',
    async(page, { rejectWithValue }) => {
        try {
           const res = await axios.get(`${urlObjects}/getall/building/f-${page}`);
           return res.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getFloorById = createAsyncThunk(
    'ObjectsSlice/objedsgetallsvg',
    async(page, { rejectWithValue }) => {
        try {
           const res = await axios.get(`${BASE_URL}/api/v1/floor?id=${page}`);
           return res.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getFloorByBuilding = createAsyncThunk(
    'ObjectsSlice/objedsgallsvg',
    async(page, { rejectWithValue }) => {
        try {
           const res = await axios.get(`${BASE_URL}/api/v1/floor/all?id=${page}`);
           return res.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getApartmentsByFloorId = createAsyncThunk(
    'ObjectsSlice/floorSvgById',
    async(page, { rejectWithValue }) => {
        try {
           const res = await axios.get(`${urlObjects}/getbyfloor?id=${page}`);
           return res.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAllApartmentsByFloorId = createAsyncThunk(
    'ObjectsSlice/getAllApartmentsByFloorId',
    async(id, { rejectWithValue }) => {
        try {
           const res = await axios.get(`${urlObjects}/getbyfloor?id=${id}`);
           return res.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getApartmentsSvgDataAll = createAsyncThunk(
    'ObjectsSlice/get/all',
    async(a, { rejectWithValue }) => {
        try {
           const res = await axios.get(`${urlObjects}/get`);
           return res.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchApartmentAllData = createAsyncThunk(
    'ObjectsSlice/get/all/data',
    async(a, { rejectWithValue }) => {
        try {
           const res = await axios.get(`${urlObjects}/get/all`);
           return res.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchApartmentsAll = createAsyncThunk(
    'ObjectsSlice/get/all/apartments',
    async(a, { rejectWithValue }) => {
        try {
           const res = await axios.get(`${urlObjects}/get/apartment`);
           return res.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchApartmentsAllOrderByApartmentId = createAsyncThunk(
    'ObjectsSlice/get/all/apartments/order/apartmentid',
    async(a, { rejectWithValue }) => {
        try {
           const res = await axios.get(`${urlObjects}/get/all/apartmentid`);
           return res.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getApartmentsSvgDataAllById = createAsyncThunk(
    'ObjectsSlice/getall',
    async(a, { rejectWithValue }) => {
        try {
           const res = await axios.get(`${urlObjects}/get`);
           return res.data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



export const updateIsSold = createAsyncThunk(
    'ObjectsSlice/updateIsSold',
    async( data, { rejectWithValue } ) => {
        try {
            const res = await axios.get(`${urlObjects}/update/sold?id=${data.id}&isSold=${data.isSold}`, tokenConfig())
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const getApartmentById = createAsyncThunk(
    'ApartmentSlice/getApartmentById',
    async(id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${urlObjects}/getbyid?id=${id}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAllApartmentsById = createAsyncThunk();


export const updateApartment = createAsyncThunk(
    'ObjectsSlice/updateApartment',
    async({id, formData}, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${urlObjects}/update?id=${id}`, formData);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const updateApartmentId = createAsyncThunk(
    'ObjectsSlice/updateApartmentId',
    async({id, newId}, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${urlObjects}/update/apartmentId?id=${id}&apartmentId=${newId}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/consts';

const apiUrl = `${BASE_URL}/api/v1/store`; // Replace with your actual API URL

// Create
export const createCommercialStore = createAsyncThunk(
    'commercialStore/createCommercialStore',
    async (CommercialStoreApiData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/create/list`, CommercialStoreApiData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Read
export const fetchAllCommercialStoreByBuilding = createAsyncThunk(
    'commercialStore/fetchCommercialStore',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/getall/building/s-${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAllCommercialStoreAndBuilding = createAsyncThunk(
    'commercialStore/fetchCommercialStoreAndBuilding',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/get/all`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Update
export const updateCommercialStore = createAsyncThunk(
    'commercialStore/updateCommercialStore',
    async ({id, formData}, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${apiUrl}/update?id=${id}`, formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Delete
export const deleteCommercialStore = createAsyncThunk(
    'commercialStore/deleteCommercialStore',
    async (CommercialStoreApiId, { rejectWithValue }) => {
        try {
            await axios.delete(`${apiUrl}/CommercialStoreApis/${CommercialStoreApiId}`);
            return CommercialStoreApiId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
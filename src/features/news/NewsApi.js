import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/consts';

// Define your API base URL
const url = `${BASE_URL}/api/v1/news`;

// Create an async thunk for fetching news
export const getAllNews = createAsyncThunk('news/fetch', async (_, { rejectWithValue } ) => {
    try {
        const response = await axios.get(`${url}/get/all`);
        return response.data;
    } catch (error) {
        // Handle error and return it using rejectWithValue
        return rejectWithValue(error.response.data);
    }
});

export const getNewsById = createAsyncThunk('news/getById', async (newsId, { rejectWithValue } ) => {
    try {
        const response = await axios.get(`${url}/get/${newsId}`);
        return response.data;
    } catch (error) {
        // Handle error and return it using rejectWithValue
        return rejectWithValue(error.response.data);
    }
});

// Create an async thunk for creating news
export const createNews = createAsyncThunk('news/create', async (newsData, { rejectWithValue } ) => {
    try {
        const response = await axios.post(`${url}/create`, newsData);
        return response.data;
    } catch (error) {
        // Handle error and return it using rejectWithValue
        return rejectWithValue(error.response.data);
    }
});

// Create an async thunk for updating news
export const updateNews = createAsyncThunk('news/update', async (newsData, { rejectWithValue } ) => {
    try {
        const response = await axios.put(`${url}/update?id=${newsData.id}`, newsData);
        return response.data;
    } catch (error) {
        // Handle error and return it using rejectWithValue
        return rejectWithValue(error.response.data);
    }
});

// Create an async thunk for deleting news
export const deleteNews = createAsyncThunk('news/delete', async (newsId, { rejectWithValue } ) => {
    try {
        await axios.delete(`${url}/delete?id=${newsId}`);
        return newsId;
    } catch (error) {
        // Handle error and return it using rejectWithValue
        return rejectWithValue(error.response.data);
    }
});
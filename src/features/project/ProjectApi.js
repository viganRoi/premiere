import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/consts';

// Define your API base URL
const url = `${BASE_URL}/api/v1/project`;

// Define your CRUD operations
export const createProject = createAsyncThunk('project/createProject', async (ProjectData, { rejectWithValue } ) => {
    try {
        const response = await axios.post(`${url}/create`, ProjectData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getProjectById = createAsyncThunk('project/getProject', async (ProjectId, { rejectWithValue } ) => {
    try {
        const response = await axios.get(`${url}/get/${ProjectId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getAllProjects = createAsyncThunk('project/getAllProjects', async (_, { rejectWithValue } ) => {
    try {
        const response = await axios.get(`${url}/get/all`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateProject = createAsyncThunk('project/updateProject', async (ProjectData, { rejectWithValue } ) => {
    try {
        const response = await axios.put(`${url}/update/${ProjectData.id}`, ProjectData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteProject = createAsyncThunk('project/deleteProject', async (ProjectId, { rejectWithValue } ) => {
    try {
        await axios.delete(`${url}/delete/${ProjectId}`);
        return ProjectId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
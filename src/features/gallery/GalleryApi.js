import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/consts";

const url = `${BASE_URL}/api/v1/gallery`;

export const fetchGalleryUrl = createAsyncThunk(
    'Gallery/getGalleryByApartmentId',
    async(id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${url}/get/apartment?id=${id}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
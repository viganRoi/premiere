import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { refreshTokenConfig } from "./AuthSlice";
import { BASE_URL } from "../../utils/consts";

export const RefreshToken = createAsyncThunk(
    "RefreshTokenAndResendApi",
    async (obj, { rejectWithValue }) => {
        try {
            
            const refreshTokenRes = await axios.get(`${BASE_URL}/api/auth/refresh`, refreshTokenConfig());
            return refreshTokenRes.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
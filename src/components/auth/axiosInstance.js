import axios from 'axios';
import { BASE_URL } from '../../utils/consts';
import CryptoJS, { enc, SHA1 } from 'crypto-js';

function getSession() {
  const secretKey = import.meta.env.VITE_ENCRYPTION_SECRET_KEY;
  const encSessionData = localStorage.getItem('session');
  if (encSessionData) {
    const decSessionData = CryptoJS.AES.decrypt(encSessionData, secretKey).toString(CryptoJS.enc.Utf8);
    return decSessionData;
  }
  return null;
}

function getAccessToken() {
  const session = getSession();
  if (session) {
    return JSON.parse(session).access_token;
  }
  return null;
};

function getRefreshToken() {
  const session = getSession();
  if (session) {
    return JSON.parse(session).refresh_token;
  }
  return null;
}

function setSession(sessionData) {
  const secretKey = import.meta.env.VITE_ENCRYPTION_SECRET_KEY;
  const encSessionData = CryptoJS.AES.encrypt(JSON.stringify(sessionData), secretKey).toString();
  console.log(encSessionData)
  localStorage.setItem('session', encSessionData);
}

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    // Get token from wherever it's stored
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    // Check if the error is due to token expiration
    if (response && response.status === 401) {
      try {
        // Refresh token
        const refreshToken = getRefreshToken();
        const { data } = await axios.get(`${BASE_URL}/api/auth/refresh`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        console.log(data)

        // Save the new token
        setSession(data);

        // Retry the failed request with the new token
        error.config.headers.Authorization = `Bearer ${data.token}`;
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        // Handle refresh token error (e.g., redirect to login)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

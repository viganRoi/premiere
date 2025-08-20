import { BASE_URL } from '../../utils/consts';
import axiosInstance from './axiosInstance'; // Import the configured Axios instance

/**
 * Executes an Axios request and handles token expiration.
 * @param {Function} runAxios - The Axios request function to execute.
 * @returns {Promise} - The result of the Axios request.
 */
async function executeRequest(runAxios) {
  try {
    return await runAxios();
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('EXPIRED TOKEN')
      // Token expired, handle token refresh
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.get(`${BASE_URL}/api/auth/refresh`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        console.log(data)
        // Save the new token
        localStorage.setItem('token', data.access_token);

        // Retry the request with the new token
        return await runAxios();
      } catch (refreshError) {
        // Handle refresh token error
        throw refreshError;
      }
    }

    throw error;
  }
}

export default executeRequest;

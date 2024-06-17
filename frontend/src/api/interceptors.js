import axios from 'axios';

import { getTokens, removeFromStorage } from '@/services/auth-token.service';
import { authService } from '@/services/authService';

export const API_URL = process.env.API_URL;

export const MEDIA_URL = process.env.MEDIA_URL;

const options = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': '*',
  },
  withCredentials: true,
};

const axiosUnauth = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
  const { accessToken, refreshToken } = getTokens();

  if (config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens(refreshToken);
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        // removeFromStorage();
        console.log(error);
      }
    }

    throw error;
  },
);

export { axiosUnauth, axiosWithAuth };

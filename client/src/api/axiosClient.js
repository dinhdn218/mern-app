import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from '@/constants/common';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: API_URL,
});

axiosClient.interceptors.request.use((config) => {
  // Handle token here...
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle error
    throw error;
  },
);

export default axiosClient;

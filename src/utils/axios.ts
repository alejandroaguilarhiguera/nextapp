import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  },
  (error) => {
    return error;
  },
);

export default axiosInstance;

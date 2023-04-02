import axios, { AxiosError } from 'axios';
import { PayloadError } from '~/types';
import getSession from '~/utils/getSession';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
axiosInstance.interceptors.request.use((config: any) => {
    if (!window) return;
    const session = getSession();
    if (session?.jwt) {
      config.headers.Authorization = `Bearer ${session?.jwt}`;
    }
    return config;
  },
  (error) => {
    return error;
  }
);

export default axiosInstance;

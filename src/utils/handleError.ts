import { AxiosError } from 'axios';
import { PayloadError } from '~/types';

export default function handleError(axiosError: AxiosError): { status: number, message: string} {
    const { data, error } = axiosError.response?.data as PayloadError;
    const { response } = axiosError;
    if (error?.status === 400) {
      return {
        message: error.message,
        status: error.status
      }
    }
    if (Number(response?.status) >= 500) {
      console.error('[500] remote server error', response?.data);
      return {
        message: 'Unexpected error',
        status: Number(response?.status),
      }
    }
    console.error('[500] internal server error', response?.data);
    return {
      message: 'Unexpected error',
      status: Number(response?.status),
    }
    
  }
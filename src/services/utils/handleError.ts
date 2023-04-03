import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

interface ResponseError {
    data: null;
    error: {
        status: number; 
        name: string; 
        message: string; 
        details: { [key: string]: string | number | boolean }; 
    }
}

export default function handleError(
    req: NextApiRequest,
    res: NextApiResponse,
    error: any
) {
    let status = 500;
    let message = 'Internal unexpected error';
    if (error?.isAxiosError) {
        const axiosError = error as AxiosError;
        status = Number(axiosError.response?.status);
        if (status === 400) {
            message = error.message;
        } else if(status === 404) {
            const dataError = axiosError.response?.data as ResponseError;
            message = dataError.error?.message;
        } else if(Number(status) >= 500 ) {
            console.error('External api unexpected error');
            message = 'Unexpected error';
        }
        console.log('response =====> ', axiosError.response?.data);
    } else {
        console.error('Internal unexpected error');
    }
    return res.status(status).json({
        status,
        message,
    });
}
import React from 'react';
import useSWR from 'swr';
import request from '~/utils/request';
import { Customer } from '~/modules/customers/types';
import { API_REQUEST_GET_CUSTOMERS } from '~/config/routes';

export const useCustomers = () => {
    const { data: customers, isLoading } = useSWR('/customers', async () => {
        const { url, method } = API_REQUEST_GET_CUSTOMERS;
        const customers = await request<Customer[]>({
            url,
            method,
        });
        return customers;
    });

    return {
        customers,
        isLoading,
    } 
}

export default useCustomers;
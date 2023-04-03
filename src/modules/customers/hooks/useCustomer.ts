import React from 'react';
import useSWR from 'swr';
import request from '~/utils/request';
import { Customer } from '~/modules/customers/types';
import { API_REQUEST_SHOW_CUSTOMERS } from '~/config/routes';

export const useCustomer = (id: number) => {
    const { data: customer, isLoading } = useSWR(`/customers/${id}`, async () => {
        const { path, method } = API_REQUEST_SHOW_CUSTOMERS;
        const customer = await request<Customer>({
            url: path.replace(':id', id.toString()),
            method,
        });
        return customer;
    });

    return {
        customer,
        isLoading,
    } 
}

export default useCustomer;
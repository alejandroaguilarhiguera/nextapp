import React from 'react';
import useSWR from 'swr';
import { API_REQUEST_GET_CUSTOMERS } from '~/config/routes';
import { Customer } from '~/modules/customers/types';

import request from '~/utils/request';

export const useCustomers = () => {
  const { data: customers, isLoading } = useSWR('/customers', async () => {
    const { path, method } = API_REQUEST_GET_CUSTOMERS;
    const customers = await request<Customer[]>({
      url: path,
      method,
    });
    return customers;
  });

  return {
    customers,
    isLoading,
  };
};

export default useCustomers;

import React from 'react';
import useSWR from 'swr';
import { API_REQUEST_SHOW_CUSTOMERS } from '~/config/routes';
import { Customer } from '~/modules/customers/types';

import request from '~/utils/request';

export const useCustomer = (id: number) => {
  const {
    data: customer,
    isLoading,
    isValidating,
  } = useSWR(id ? `/customers/${id}` : null, async () => {
    const { path, method } = API_REQUEST_SHOW_CUSTOMERS;
    const customer = await request<Customer>({
      url: path.replace(':id', id.toString()),
      method,
    });
    return customer;
  });

  return {
    isValidating,
    customer,
    isLoading,
  };
};

export default useCustomer;

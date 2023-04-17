import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import { API_REQUEST_GET_COUNTRIES } from '~/config/routes';

import request from '~/utils/request';

import { Country } from '~/types';

export const useCustomers = () => {
  const { data: countries, isLoading } = useSWR('/countries', async () => {
    const { path, method } = API_REQUEST_GET_COUNTRIES;
    const { data: countries } = await axios<Country[]>({
      url: 'http://localhost:3000/api' + path,
      method,
    });
    return countries;
  });

  return {
    countries,
    isLoading,
  };
};

export default useCustomers;

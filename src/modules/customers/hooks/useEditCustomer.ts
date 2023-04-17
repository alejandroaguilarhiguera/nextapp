import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { API_REQUEST_EDIT_CUSTOMERS } from '~/config/routes';
import { Customer, EditCustomer } from '~/modules/customers/types';
import schema from '~/modules/customers/utils/editCustomerSchema';

import request from '~/utils/request';

export const useEditCustomer = (customer: Customer) => {
  useEffect(() => {
    setValue('id', customer.id);
    setValue('name', customer.name);
    setValue('countryId', customer.countryId);
  }, [customer]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isSubmitSuccessful, isLoading },
  } = useForm<EditCustomer>({
    criteriaMode: 'all',
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: EditCustomer) => {
    const { path } = API_REQUEST_EDIT_CUSTOMERS;
    const newCustomer = await request<EditCustomer>({
      ...API_REQUEST_EDIT_CUSTOMERS,
      url: path.replace(':id', data.id.toString()),
      data,
    });
    return newCustomer;
  };

  return {
    isLoading,
    setValue,
    getValues,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit: handleSubmit(onSubmit),
  };
};

export default useEditCustomer;

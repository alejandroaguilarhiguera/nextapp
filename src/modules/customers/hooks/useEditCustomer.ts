import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { API_REQUEST_EDIT_CUSTOMERS } from '~/config/routes';
import { Customer, EditCustomer } from '~/modules/customers/types';
import schema from '~/modules/customers/utils/editCustomerSchema';

import request from '~/utils/request';

export const useEditCustomer = (customer: Customer) => {
  const [id] = useState(customer.id);
  const [name] = useState(customer.name);
  useEffect(() => {
    setValue('id', id);
    setValue('name', name);
  }, [customer?.id]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
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
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit: handleSubmit(onSubmit),
  };
};

export default useEditCustomer;

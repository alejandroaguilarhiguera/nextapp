import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import request from '~/utils/request';
import { NewCustomer } from '~/modules/customers/types';
import schema from '~/modules/customers/utils/newCustomerSchema';
import { API_REQUEST_ADD_CUSTOMERS } from '~/config/routes';

export const useAddCustomer = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<NewCustomer>({
        criteriaMode: 'all',
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data: NewCustomer) => {
        const { method, path } = API_REQUEST_ADD_CUSTOMERS;
        const newCustomer = await request<NewCustomer>({
            method,
            url: path,
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
    }
}

export default useAddCustomer;
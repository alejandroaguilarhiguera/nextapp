import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import request from '~/utils/request';
import { EditCustomer, Customer } from '~/modules/customers/types';
import schema from '~/modules/customers/utils/editCustomerSchema';
import { API_REQUEST_EDIT_CUSTOMERS } from '~/config/routes';

export const useEditCustomer = (customer: Customer) => {
    const [id] = useState(customer.id);
    const [name] = useState(customer.name);
    useEffect(() => {
        setValue('id', id);
        setValue('name', name);
    },[customer?.id]);
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<EditCustomer>({
        criteriaMode: 'all',
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data: EditCustomer) => {
        const { url } = API_REQUEST_EDIT_CUSTOMERS; 
        const newCustomer = await request<EditCustomer>({
            ...API_REQUEST_EDIT_CUSTOMERS,
            url: url.replace(':id', data.id.toString()),
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

export default useEditCustomer;
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import request from '~/utils/request';
import Login from '~/modules/auth/types/Login';
import schema from '~/modules/auth/utils/loginSchema';
import { API_AUTH_LOGIN } from '~/config/routes';

export const useDoLogin = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Login>({
        criteriaMode: 'all',
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data: Login) => {
        const session = await request<Login>({
            ...API_AUTH_LOGIN,
            data,
        });
        alert(JSON.stringify(session));
    };
    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit: handleSubmit(onSubmit),
    }
}

export default useDoLogin;
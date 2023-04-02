import React from 'react';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import request from '~/utils/request';
import Login from '~/modules/auth/types/Login';
import schema from '~/modules/auth/utils/loginSchema';
import { API_AUTH_LOGIN } from '~/config/routes';
import { mutate } from 'swr';
import { Session } from '~/types';

export const useDoLogin = () => {
    const { push } = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Login>({
        criteriaMode: 'all',
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data: Login) => {
        const session = await request<Session>({
            ...API_AUTH_LOGIN,
            data,
        });
        localStorage.setItem('session', JSON.stringify(session));
        mutate('session', session);
        push('/customers');
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
import React from 'react';
import { NextPage } from 'next';
import LoginForm from '~/modules/auth/components/LoginForm';

interface Props {

}

const Index: NextPage<Props> = (props: Props) => {
    return (
        <LoginForm>
        </LoginForm>
    );
};

export default Index;
import { NextPage } from 'next';
import React from 'react';
import LoginForm from '~/modules/auth/components/LoginForm';

interface Props {}

const Index: NextPage<Props> = (props: Props) => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoginForm />
    </div>
  );
};

export default Index;

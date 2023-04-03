import React from 'react';
import { NextPage } from 'next';
import Layout from '~/components/Layout';

interface Props {

}

const Dashboard: NextPage<Props> = (props: Props) => {
    return (
        <Layout>
           dashboard page
        </Layout>
    );
};

export default Dashboard;
import React from 'react';
import { NextPage } from 'next';
import Details from '~/modules/customers/components/Details';
import Layout from '~/components/Layout';

interface Props {

}

const Show: NextPage<Props> = (props: Props) => {
    return (
        <Layout>
            <Details />
        </Layout>
    );
};

export default Show;
import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Details from '~/modules/customers/components/Details';
import Layout from '~/components/Layout';
import useCustomer from '~/modules/customers/hooks/useCustomer';

interface Props {

}

const Show: NextPage<Props> = (props: Props) => {
    const router = useRouter();
    const id = Number(router.query.id);
    const {customer, isLoading} = useCustomer(id);
    if (isLoading) {
        return (<>Loading ...</>)
    }
    if (!customer) {
        return (<>Error </>)
    }
    return (
        <Layout>
            <Details customer={customer} />
        </Layout>
    );
};

export default Show;
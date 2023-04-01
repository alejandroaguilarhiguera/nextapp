import React from 'react';
import { NextPage } from 'next';
import CustomerTable from '~/modules/customers/components/CustomerTable';

interface Props {

}

const Listing: NextPage<Props> = (props: Props) => {
    return (<>
        <CustomerTable />
    </>);
};

export default Listing;
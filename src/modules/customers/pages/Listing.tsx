import { Button } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import Table from '~/modules/customers/components/Table';

import Layout from '~/components/Layout';

interface Props {}

const Listing: NextPage<Props> = (props: Props) => {
  return (
    <Layout>
      <Link href={'/customers/new'}>
        <Button variant="contained">New client</Button>
      </Link>
      <Table />
    </Layout>
  );
};

export default Listing;

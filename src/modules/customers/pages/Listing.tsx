import { Button } from '@mui/material';
import type { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import React from 'react';
import { mutate } from 'swr';
import { API_REQUEST_GET_CUSTOMERS } from '~/config/externalAPIRoutes';
import Table from '~/modules/customers/components/Table';
import { Customer } from '~/modules/customers/types';
import { authOptions } from '~/pages/api/auth/[...nextauth]';
import { CustomerAPI } from '~/services/types';

import Layout from '~/components/Layout';

interface Props {
  customers: Customer[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const url = process.env.URL_API;
  const { method, path } = API_REQUEST_GET_CUSTOMERS;
  const request = await fetch(`${url}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  let customers: Customer[] | undefined;
  if (request.ok) {
    const { data }: { data: CustomerAPI[] } = await request.json();
    customers = data.map((customer) => ({
      id: customer.id,
      name: customer.attributes.name,
      groupId: 1,
      middleName: customer.attributes.middleName,
      lastName: customer.attributes.lastName,
      shortName: customer.attributes.shortName,
      countryId: 1,
      country: { id: 1, name: '' },
      group: { id: 1, name: 'group' },
      managerRelationshipId: 1,
      managerRelationship: { id: 1, name: '' },
      licenseTypeId: 1,
      licenseType: { id: 1, name: 'Pro' },
      mappingId: customer.attributes.mappingId,
      status: '123',
    }));
  }

  return {
    props: {
      session,
      customers,
    },
  };
};

const Listing: NextPage<Props> = ({ customers }: Props) => {
  mutate('/customers', customers, false);
  return (
    <div>
      <Layout>
        <Link href={'/customers/new'}>
          <Button variant="contained">New client</Button>
        </Link>
        <Table />
      </Layout>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Listing;

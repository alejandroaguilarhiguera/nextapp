import { Button } from '@mui/material';
import type { GetServerSideProps, GetStaticPropsContext } from 'next';
import { NextPage } from 'next';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import Table from '~/modules/customers/components/Table';
import { authOptions } from '~/pages/api/auth/[...nextauth]';

import Layout from '~/components/Layout';

interface Props {}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
};

const Listing: NextPage<Props> = (props: Props) => {
  const { data: session, status } = useSession();

  if (typeof window === 'undefined') return null;
  if (status === 'loading') return <p>Loading ...</p>;
  if (status === 'unauthenticated' || !session) return <p>Access Denied</p>;
  return (
    <Layout>
      <Link href={'/customers/new'}>
        <Button variant="contained">New client</Button>
      </Link>
      <Table />
    </Layout>
  );
};

export async function getStaticProps() {
  console.log('static props');
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Listing;

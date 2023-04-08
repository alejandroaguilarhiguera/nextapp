import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import React from 'react';

import Layout from '~/components/Layout';

interface Props {}

const Dashboard: NextPage<Props> = (props: Props) => {
  const { data: session } = useSession();
  return <Layout>dashboard page {JSON.stringify(session)}</Layout>;
};

export default Dashboard;

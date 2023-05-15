import { Button, Grid } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { mutate } from 'swr';
import Table from '~/modules/customers/components/Table';
import { Customer } from '~/modules/customers/types';

import Layout from '~/components/Layout';
import { useTranslation } from '~/utils/i18n';

interface Props {
  customers: Customer[];
}

const Listing: NextPage<Props> = ({ customers }: Props) => {
  const { t } = useTranslation();
  mutate('/customers', customers, false);
  return (
    <div>
      <Layout>
        <Grid container spacing={2}>
          <Grid item>
            <Link href={'customers/new'}>
              <Button variant="contained">{t('new client')}</Button>
            </Link>
          </Grid>
          <Grid item>
            <Table />
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
};

export default Listing;

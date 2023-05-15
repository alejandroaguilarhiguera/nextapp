import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Details from '~/modules/customers/components/Details';
import useCustomer from '~/modules/customers/hooks/useCustomer';

import Layout from '~/components/Layout';
import { useTranslation } from '~/utils/i18n';

interface Props {}

const Show: NextPage<Props> = (props: Props) => {
  const { t } = useTranslation();

  const router = useRouter();
  const id = Number(router.query.id);
  const { customer, isLoading } = useCustomer(id);
  if (isLoading) {
    return <>{t('loading')} ...</>;
  }
  if (!customer) {
    return <>{t('error')} </>;
  }
  return (
    <Layout>
      <Details customer={customer} />
    </Layout>
  );
};

export default Show;

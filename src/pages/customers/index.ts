import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { API_REQUEST_GET_CUSTOMERS } from '~/config/externalAPIRoutes';
import { Customer } from '~/modules/customers/types';
import { authOptions } from '~/pages/api/auth/[...nextauth]';
import { CustomerAPI } from '~/services/types';

export { default } from '~/modules/customers/pages/Listing';
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const session = await getServerSession(context.req, context.res, authOptions);
  const url = process.env.URL_API;
  const { method, path } = API_REQUEST_GET_CUSTOMERS;
  const request = await fetch(`${url}${path}?populate=country`, {
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
      countryId: customer.attributes.country.data?.id || null,
      country: { id: 2, name: '' },
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
      ...(await serverSideTranslations(String(locale), ['common'])),
    },
  };
};

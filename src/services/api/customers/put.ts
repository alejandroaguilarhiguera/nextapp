import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorRequest, PayloadError } from 'types';
import { Customer } from '~/modules/customers/types';
import { CustomerAPI, Payload } from '~/services/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Customer | Customer[] | ErrorRequest | PayloadError>,
) {
  const { URL_API: url } = process.env;
  const { authorization } = req.headers;
  const id = req.query.id as string;
  const dataRequest = {
    ...req.body,
    ...(req.body.countryId
      ? {
          country: {
            connect: [{ id: req.body.countryId, position: { end: true } }],
          },
        }
      : {}),
  };

  const {
    data: { data },
  } = await axios<Payload<CustomerAPI>>({
    url: `${url}/customers/${id}?populate=country`,
    method: 'PUT',
    headers: { Authorization: authorization },
    data: { data: dataRequest },
  });
  const customer: Customer = {
    id: data.id,
    name: data.attributes.name,
    groupId: 1,
    middleName: data.attributes.middleName,
    lastName: data.attributes.lastName,
    shortName: data.attributes.shortName,
    country: {
      id: data.attributes.country.data.id,
      name: data.attributes.country.data.attributes.name,
    },
    group: { id: 1, name: 'group' },
    managerRelationshipId: 1,
    managerRelationship: { id: 1, name: '' },
    licenseTypeId: 1,
    licenseType: { id: 1, name: 'Pro' },
    mappingId: data.attributes.mappingId,
    status: '123',
  };
  return res.status(200).json(customer);
}

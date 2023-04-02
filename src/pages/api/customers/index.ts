import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import { Customer } from '~/modules/customers/types';
import { ErrorRequest, Payload } from '~/types';
import { API_REQUEST_GET_CUSTOMERS } from '~/config/routes';
import handleError from '~/utils/handleError';

interface CustomerAPI {
  id: number;
  attributes: {
    name: string;
    middleName: string;
    lastName: string;
    shortName: string;
    mappingId: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Customer[] | ErrorRequest >
) {
  const { authorization } = req.headers;

  if (req.method === 'GET') {
    const { method, url: path  } = API_REQUEST_GET_CUSTOMERS;
    const { URL_API: url } = process.env;

    try {
      const { data } = await axios<Payload<CustomerAPI[]>>({
        url: `${url}${path}`,
        method,
        headers: { Authorization: authorization },
      });
      const customers: Customer[] = data.data.map((customer) => ({
        id: customer.id,
        name: customer.attributes.name,
        groupId: 1,
        middleName: customer.attributes.middleName,
        lastName: customer.attributes.lastName,
        shortName: customer.attributes.shortName,
        countryId: 1,
        country: { id: 1, name: ''},
        group: { id: 1, name: 'group'},
        managerRelationshipId: 1,
        managerRelationship: { id: 1, name: ''},
        licenseTypeId: 1,
        licenseType: { id: 1, name: ''},
        mappingId: customer.attributes.mappingId,
        status: '123',
      }))
      return res.status(200).json(customers);
    } catch (error: any) {
      if (error?.isAxiosError) {
        const { status = 500, message, /*validationErrors*/ } = handleError(error as AxiosError);
        return res.status(status).json({
          status,
          message,
        });
      }
    }
    return res.status(500).json({
      message: 'Error undefined',
    });
  }

  // if (req.method === 'POST') {
  //   return res.status(200).json({
  //     id: 1,
  //     name: req.body.name,
  //   });
  // }

  return res.status(405).json({
    message: 'Method not allowed',
  })
}

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { LicenseType } from '~/modules/customers/types';
import { Payload } from '~/services/types';

import { ErrorRequest } from '~/types';

interface LicenseTypeAPI {
  id: number;
  attributes: {
    name: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LicenseType[] | ErrorRequest>,
) {
  const { URL_API: url } = process.env;

  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }
  const {
    data: { data },
  } = await axios<Payload<LicenseTypeAPI[]>>({
    url: `${url}/license-types`,
  });
  const licenseType: LicenseType[] = data?.map(({ id, attributes: { name } }) => ({ id, name }));

  return res.status(200).json(licenseType);
}

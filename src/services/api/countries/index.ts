import type { NextApiRequest, NextApiResponse } from 'next';
import { PayloadError } from 'types';
import get from '~/services/api/countries/get';
import { Methods } from '~/services/types';
import handleError from '~/services/utils/handleError';
import methodNotAllowed from '~/services/utils/methodNotAllowed';

import { Country } from '~/types';

const methods: Methods = {
  get,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Country[] | Country | PayloadError>,
) {
  const request = methods[req?.method?.toLocaleLowerCase() ?? ''] ?? methodNotAllowed;
  try {
    return await request(req, res);
  } catch (error) {
    console.error('error', error);
  }
}

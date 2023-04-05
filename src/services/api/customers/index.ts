import type { NextApiRequest, NextApiResponse } from 'next';
import { Customer } from '~/modules/customers/types';
import deleteMethod from '~/services/api/customers/delete';
import get from '~/services/api/customers/get';
import post from '~/services/api/customers/post';
import put from '~/services/api/customers/put';
import { Methods } from '~/services/types';
import handleError from '~/services/utils/handleError';
import methodNotAllowed from '~/services/utils/methodNotAllowed';

import { PayloadError } from '~/types/';

const methods: Methods = {
  post,
  get,
  put,
  delete: deleteMethod,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Customer[] | Customer | PayloadError>,
) {
  const request = methods[req?.method?.toLocaleLowerCase() ?? ''] ?? methodNotAllowed;
  try {
    return await request(req, res);
  } catch (error) {
    return handleError(req, res, error);
  }
}

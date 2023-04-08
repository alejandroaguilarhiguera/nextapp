import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorRequest, PayloadError, Session } from 'types';
import post from '~/services/api/auth/login/post';
import { Methods } from '~/services/types';
import handleError from '~/services/utils/handleError';
import methodNotAllowed from '~/services/utils/methodNotAllowed';

const methods: Methods = {
  post,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Session | ErrorRequest | PayloadError>,
) {
  const request = methods[req?.method?.toLocaleLowerCase() ?? ''] ?? methodNotAllowed;
  try {
    return await request(req, res);
  } catch (error) {
    return handleError(req, res, error);
  }
}

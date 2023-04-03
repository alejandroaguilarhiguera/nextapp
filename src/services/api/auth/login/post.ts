import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { ErrorRequest, PayloadError, Session } from '~/types';
import { API_AUTH_LOGIN } from '~/config/routes';
import { SessionAPI } from '~/services/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Session | ErrorRequest | PayloadError>
) {
  const { URL_API: url } = process.env;
  const { method } = API_AUTH_LOGIN;
  const { data:  { jwt, user } } = await axios<SessionAPI>({
    url: `${url}/auth/local`,
    method,
    data: req.body,
  });
  const session: Session = {
    jwt,
    user,
  };
  return res.status(200).json(session);
}

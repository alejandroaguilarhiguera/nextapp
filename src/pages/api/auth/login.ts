import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError  } from 'axios';
import { ErrorRequest, PayloadError, Session } from '~/types';
import { API_AUTH_LOGIN } from '~/config/routes';
import handleError from '~/utils/handleError';

interface SessionAPI {
  jwt: string;
  user: {
    id: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
    blocked: boolean;
    provider: 'local';
    confirmed: true;
    createdAt: Date | string;
    updatedAt: Date | string;
  }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Session | ErrorRequest | PayloadError>
) {
  const { URL_API: url } = process.env;
  const { method } = API_AUTH_LOGIN;
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }

  try {
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
  } catch (error: any) {
    if (error?.isAxiosError) {
      const { status = 500, message, /*validationErrors*/ } = handleError(error as AxiosError);
      return res.status(status).json({
        status,
        message,
      });
    }
    return res.status(500).json({
      message: 'Error undefined',
    });
  }
}

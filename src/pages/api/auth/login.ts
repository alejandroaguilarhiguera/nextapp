import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from '~/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Session>
) {
  return res.status(200).json({
    token: '123',
    user: {
        email: req.body.email,
    }
  });
}

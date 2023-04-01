import type { NextApiRequest, NextApiResponse } from 'next';
import { faker } from '@faker-js/faker';
import { Customer } from '~/modules/customers/types';
import { ErrorRequest } from '~/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Customer | { id: number }| ErrorRequest>
) {

  if (req.method === 'GET') {
    return res.status(200).json({
      id: 1,
      name: 'customer showed'
    });
  }

  if (req.method === 'PATCH') {
    return res.status(200).json({
      id: 1,
      name: 'customer showed'
    });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({
      id: 1,
    });
  }


  return res.status(405).json({
    message: 'Method not allowed',
  })
}

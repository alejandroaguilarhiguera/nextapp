import type { NextApiRequest, NextApiResponse } from 'next';
import { faker } from '@faker-js/faker';
import { Customer } from '~/modules/customers/types';
import { ErrorRequest } from '~/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Customer[] | Customer | ErrorRequest >
) {

  if (req.method === 'GET') {
    return res.status(200).json(
        Array(20).fill(null).map((_, index)=> ({
            id: index + 1,
            name: faker.name.fullName(),
        }))
    );
  }

  if (req.method === 'POST') {
    return res.status(200).json({
      id: 1,
      name: req.body.name,
    });
  }

  return res.status(405).json({
    message: 'Method not allowed',
  })
}

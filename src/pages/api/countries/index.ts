import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Payload } from '~/services/types';
import { CountryAPI } from '~/services/types';

import { Country, ErrorRequest } from '~/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Country[] | ErrorRequest>,
) {
  const { URL_API: url } = process.env;

  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }
  const {
    data: { data },
  } = await axios<Payload<CountryAPI[]>>({
    url: `${url}/countries`,
  });
  const countries: Country[] = data?.map(({ id, attributes: { name } }) => ({ id, name }));

  return res.status(200).json(countries);
}

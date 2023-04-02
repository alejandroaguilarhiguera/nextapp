import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorRequest, Country, Payload } from '~/types';
interface CountryAPI {
    id: number;
    attributes: {
        name: string;
        createdAt: Date | string;
        updatedAt: Date | string;
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Country[] | ErrorRequest>
) {
  const { URL_API } = process.env;

  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }
  const { data: { data } } = await axios<Payload<CountryAPI[]>>({
    url: `${URL_API}/countries`
  });
  const countries: Country[] = data?.map(({ id, attributes: { name }}) => ({ id, name }))

  return res.status(200).json(countries);

}

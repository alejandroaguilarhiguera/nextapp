import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorRequest, PayloadError } from 'types';
import { Country } from 'types';
import { API_REQUEST_GET_COUNTRIES, API_REQUEST_SHOW_COUNTRY } from '~/config/externalAPIRoutes';
import { CountryAPI } from '~/services/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Country | Country[] | ErrorRequest | PayloadError>,
) {
  const { URL_API: url } = process.env;
  const id = req.query.id as string;
  if (id) {
    const { method, path } = API_REQUEST_SHOW_COUNTRY;
    const request = await fetch(`${url}${path.replace(':id', id)}`, {
      method,
    });
    if (!request.ok) {
      return res.status(503).json({
        message: 'Service is unavailable',
        status: 503,
      });
    }
    const { data }: { data: CountryAPI } = await request.json();
    const country: Country = {
      id: data.id,
      name: data.attributes.name,
    };
    return res.status(200).json(country);
  }

  const { method, path } = API_REQUEST_GET_COUNTRIES;

  const request = await fetch(`${url}${path}`, { method });
  if (!request.ok) {
    return res.status(503).json({
      message: 'Service is unavailable',
      status: 503,
    });
  }
  const { data }: { data: CountryAPI[] } = await request.json();
  const countries: Country[] = data?.map(({ id, attributes: { name } }) => ({ id, name }));
  return res.status(200).json(countries);
}

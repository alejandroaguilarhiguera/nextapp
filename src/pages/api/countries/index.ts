export { default } from '~/services/api/countries';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { Country, ErrorRequest } from 'types';
// import { API_REQUEST_GET_COUNTRIES } from '~/config/externalAPIRoutes';
// import { CountryAPI } from '~/services/types';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Country[] | ErrorRequest>,
// ) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({
//       message: 'Method not allowed',
//     });
//   }

//   const { URL_API: url } = process.env;
//   const { method, path } = API_REQUEST_GET_COUNTRIES;

//   const request = await fetch(`${url}${path}`, { method });
//   if (!request.ok) {
//     return res.status(503).json({
//       message: 'Service is unavailable',
//       status: 503,
//     });
//   }
//   const { data }: { data: CountryAPI[] } = await request.json();
//   const countries: Country[] = data?.map(({ id, attributes: { name } }) => ({ id, name }));
//   return res.status(200).json(countries);
// }

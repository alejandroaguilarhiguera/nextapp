import type { NextApiRequest, NextApiResponse } from 'next';
export default (req: NextApiRequest, res: NextApiResponse) => res.status(405).json({
  status: 405,
  message: 'Method not allowed',
});
import type { NextApiRequest, NextApiResponse } from 'next';
export interface Methods {
    [key: string]: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
}
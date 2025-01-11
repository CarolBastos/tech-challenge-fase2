import { statement } from "@/mocks/statement";
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return res.status(200).json(statement);
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}

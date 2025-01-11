import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from "../../mocks/userAccount";
import { User } from '@/interfaces';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const userAccount: User = user[0];
    return res.status(200).json(userAccount);
  }

  if (req.method === 'POST') {
    const { balance } = req.body;
    user[0].balance = balance;

    return res.status(201).json(user[0]);
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}

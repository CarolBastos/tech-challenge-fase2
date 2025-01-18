import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/interfaces';
import { ResponseAccount } from '@/interfaces/response-account';
import http from "@/http";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {

      const apiUrl = process.env.API_URL || 'http://localhost:8080';

      const response = await http.get<ResponseAccount>(`${apiUrl}/account`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.headers.authorization,
        },
        withCredentials: true,
      });

      const account: ResponseAccount = response.data;
      
      const userAccount: User[] = account.result.account.map((accountItem) => ({
        id: accountItem.id,
        name: account.result.cards.length > 0 ? account.result.cards[0].name : '',
        balance: 200 //TODO: não existe o saldo nesse endpoint              
      }));
      
      return res.status(200).json(userAccount[0]);

    } catch (error) {
      console.error('Erro ao acessar a API externa', error);
      return res.status(500).json({ message: 'Erro ao acessar os dados da conta' });
    }
  }

  if (req.method === 'POST') {
    const { balance } = req.body;

    return res.status(201).json({ message: 'Balance atualizado com sucesso!' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/interfaces';
import { ResponseAccount } from '@/interfaces/response-account';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // const token = req.headers.authorization?.split(' ')[1];
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFuZSBDYXJvbGluZSAzIiwiZW1haWwiOiJ0ZXN0ZTNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjMiLCJpZCI6IjY3OGJiOWNiNTFjY2U0ODhlZmEzM2QzYSIsImlhdCI6MTczNzIxMDMyMiwiZXhwIjoxNzM3MjUzNTIyfQ.NISQRuM854mcpFOwuoNBl8xE8YJ_BNEXxtHxYOUGi-Q"

      if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }

      const apiUrl = process.env.API_URL || 'http://localhost:8080';
      console.log("apiUrl account.ts", apiUrl)

      const response = await fetch(`${apiUrl}/account`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da conta');
      }

      const account: ResponseAccount = await response.json();
      
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

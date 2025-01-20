import http from "@/http";
import { Transaction } from "@/interfaces";
import { statement } from "@/mocks/statement";
import { parse } from "cookie";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      
      const apiUrl = process.env.API_URL || "http://localhost:8080";

      const cookies = req.headers.cookie;
      const parsedCookies = cookies ? parse(cookies) : {};

      const accountResult = parsedCookies.accountResult
      ? JSON.parse(parsedCookies.accountResult)
      : null;

      const accountId = accountResult.account[0].id


      const response = await http.get(
        `${apiUrl}/account/${accountId}/statement`,
        {
          headers: {
            Authorization: req.headers.authorization,
            "Content-Type": "application/json",
          },
        }
      );

      const responseBody: Transaction[] = response.data.result.transactions.map((transaction: { id: any; type: any; value: any; date: any; })=> ({
        id: transaction.id,
        description: transaction.type,
        amount: transaction.value,
        date: transaction.date,
      }))

      return res.status(response.status).json(responseBody);
    } catch (error) {
      console.error("Erro ao enviar a transação", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}

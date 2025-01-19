import { NextApiRequest, NextApiResponse } from "next";
import { isValidDateTime, isValidTransactionType } from "@/utils";
import http from "@/http";
import { parse } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const transaction = req.body;

      if (transaction.amount <= 0) {
        return res.status(400).json({ error: "Amount of transaction must be bigger than 0" });
      }

      if (!isValidTransactionType(transaction.description)) {
        return res.status(400).json({ error: "Description of transaction is not valid" });
      }

      if (!isValidDateTime(transaction.date)) {
        return res.status(400).json({ error: "Invalid date" });
      }

      const apiUrl = process.env.API_URL || "http://localhost:8080";

      const cookies = req.headers.cookie;
      const parsedCookies = cookies ? parse(cookies) : {};

      const accountResult = parsedCookies.accountResult
      ? JSON.parse(parsedCookies.accountResult)
      : null;

      const accountId = accountResult.account[0].id

      const requestBody = {
        accountId: accountId,
        value: transaction.amount,
        type: transaction.description,
        anexo: transaction.anexo
      };

      const response = await http.post(
        `${apiUrl}/account/transaction`,
        requestBody,
        {
          headers: {
            Authorization: req.headers.authorization,
            "Content-Type": "application/json",
          },
        }
      );

      const responseBody = {
        id: response.data.result.id,
        description: response.data.result.type,
        amount: response.data.result.value,
        date: response.data.result.date,
      }

      return res.status(response.status).json(responseBody);
    } catch (error) {
      console.error("Erro ao enviar a transação", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

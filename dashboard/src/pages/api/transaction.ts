import { NextApiRequest, NextApiResponse } from "next";
import { statement } from "@/mocks/statement";
import { isValidDateTime, isValidTransactionType } from "@/utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
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

    const newTransaction = {
      id: statement.transactions.length + 1,
      ...transaction,
    };

    statement.transactions.push(newTransaction);

    return res.status(201).json(newTransaction);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { statement } from "@/mocks/statement";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);
  const transactionIndex = statement.transactions.findIndex((t) => t.id === id);

  if (transactionIndex === -1) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  switch (req.method) {
    case "DELETE":
      const deletedTransaction = statement.transactions.splice(transactionIndex, 1)[0];
      return res.status(200).json(deletedTransaction);

    case "PATCH":
      const updatedTransaction = { ...statement.transactions[transactionIndex], ...req.body };
      statement.transactions[transactionIndex] = updatedTransaction;
      return res.status(200).json(updatedTransaction);

    default:
      res.setHeader("Allow", ["DELETE", "PATCH"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

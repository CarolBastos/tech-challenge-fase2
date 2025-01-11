import { isValidDateTime, isValidTransactionType } from "@/utils";
import { NextResponse } from "next/server";
import { Transaction } from "@/interfaces";
import { statement } from "../../../mocks/statement";

export async function POST(request: Request) {
  const transaction = await request.json();

  if (transaction.amount <= 0) {
    return NextResponse.json(
      { error: "Amount of transaction must be bigger than 0" },
      { status: 400 }
    );
  }

  if (!isValidTransactionType(transaction.description)) {
    return NextResponse.json(
      { error: "Description of transaction is not valid" },
      { status: 400 }
    );
  }

  if (!isValidDateTime(transaction.date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const currentDate = new Date().toISOString().split("T")[0];
  const newDate = new Date(transaction.date).toISOString().split("T")[0];
  console.log("Data atual: ", currentDate, "Data Transferência: ", newDate)

  if (newDate < currentDate) {
    return NextResponse.json(
      { error: "Date must be greater than the current date" },
      { status: 400 }
    );
  }

  const newTransaction: Transaction = {
    id: statement.transactions.length + 1,
    ...transaction,
  };

  statement.transactions.push(newTransaction);

  return new NextResponse(JSON.stringify(newTransaction), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}

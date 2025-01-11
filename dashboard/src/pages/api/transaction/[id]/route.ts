

import { NextResponse } from "next/server";
import { statement } from "../../../../mocks/statement";
import { Transaction } from "@/interfaces";
import { isValidDateTime, isValidTransactionType } from "@/utils";

type Params = {
  id: string;
};

export async function DELETE(request: Request, context: { params: Params }) {
  const index = statement.transactions.findIndex(
    (transaction) => transaction.id === parseInt(context.params.id)
  );

  if (index === -1) {
    return NextResponse.json(
      { error: "Transaction not found" },
      { status: 404 }
    );
  }

  const transactionDeleted: Transaction = statement.transactions.splice(
    index,
    1
  )[0];

  return NextResponse.json(transactionDeleted);
}

export async function PATCH(request: Request, context: { params: Params }) {
  const index = statement.transactions.findIndex(
    (transaction) => transaction.id === parseInt(context.params.id)
  );

  if (index === -1) {
    return NextResponse.json(
      { error: "Transaction not found" },
      { status: 404 }
    );
  }

  const transactionToBeUpdated: Transaction = statement.transactions[index];

  const body = await request.json();
  const { description = null, amount = null, date = null } = body;

  if (description) {
    if (!isValidTransactionType(description)) {
      return NextResponse.json(
        { error: "Description of transaction is not valid" },
        { status: 400 }
      );
    }

    transactionToBeUpdated.description = description;
  }
  if (amount) {
    if (amount > 0) {
      transactionToBeUpdated.amount = amount;
    } else {
      return NextResponse.json(
        { error: "Amount of transaction must be bigger than 0" },
        { status: 400 }
      );
    }
  }

  if (date) {
    if (!isValidDateTime(date)) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    const currentDate = new Date().toISOString();
    const newDate = new Date(date).toISOString();

    if (newDate <= currentDate) {
      return NextResponse.json(
        { error: "Date must be greater than the current date" },
        { status: 400 }
      );
    }

    transactionToBeUpdated.date = newDate;
  }

  return NextResponse.json(transactionToBeUpdated);
}

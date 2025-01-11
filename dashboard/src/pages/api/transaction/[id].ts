import { NextResponse } from "next/server";
import { statement } from "@/mocks/statement";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const index = statement.transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    const deletedTransaction = statement.transactions.splice(index, 1)[0];
    return NextResponse.json(deletedTransaction);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const transaction = statement.transactions.find((t) => t.id === id);

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    const body = await request.json();
    Object.assign(transaction, body);

    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

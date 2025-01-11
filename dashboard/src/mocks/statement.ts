import { Statement, TypesOfTransaction } from "@/interfaces";


export const statement: Statement = {
 transactions: [
    {
      id: 1,
      description: TypesOfTransaction.Deposito,
      amount: 150,
      date: new Date("2024-08-13T14:30:45Z").toISOString(),
    },
    {
      id: 2,
      description: TypesOfTransaction.Transferencia,
      amount: 40,
      date: new Date("2024-09-13T14:30:45Z").toISOString(),
    },
    {
      id: 3,
      description: TypesOfTransaction.Transferencia,
      amount: 120,
      date: new Date("2024-09-18T14:30:45Z").toISOString(),
    },
    {
      id: 4,
      description: TypesOfTransaction.Deposito,
      amount: 330,
      date: new Date("2024-10-11T14:30:45Z").toISOString(),
    },
    {
      id: 5,
      description: TypesOfTransaction.Transferencia,
      amount: 125,
      date: new Date("2024-10-21T14:30:45Z").toISOString(),
    },
  ]
};

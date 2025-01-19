export type User = {
  id: string;
  name: string;
  balance: number;
};

export enum TypesOfTransaction {
  Deposito = "depósito",
  Transferencia = "transferência",
}

export interface Transaction {
  id: number;
  description: TypesOfTransaction;
  amount: number;
  date: string;
  anexo?: string;
}

export interface Statement {
  transactions: Transaction[];
  startDate?: string;
  endDate?: string;
}

export type UserLogin = {
  id: number;
  email: string;
  password: string;
  name: string;
  terms: boolean;
};

export type SearchTransaction = {
  value: number,
  description: string,
  date: string
};
import { TypesOfTransaction } from "@/interfaces";

export const isValidDateTime = (dateTimeString: string): boolean => {
  const iso8601Regex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;
  if (!iso8601Regex.test(dateTimeString)) {
    return false;
  }

  const date = new Date(dateTimeString);
  return !isNaN(date.getTime());
};

export const isValidTransactionType = (
  value: string
): value is TypesOfTransaction => {
  return Object.values(TypesOfTransaction).includes(
    value as TypesOfTransaction
  );
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
};

export function descriptionHandler(description: string): string {
  if (description == TypesOfTransaction.Deposito) {
    return 'Credit'
  } else if (description == TypesOfTransaction.Transferencia) {
    return 'Debit'
  } else {
    return ''
  }
}

export const formattedDate = (dateString: string) => {
  const date = new Date(dateString);

  // Formate a data para yyyy-MM-dd
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
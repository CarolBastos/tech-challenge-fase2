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

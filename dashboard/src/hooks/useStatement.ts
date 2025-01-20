import { Transaction } from "@/interfaces";
import { useEffect, useState } from "react";

const useStatement = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/statement");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: Transaction[] = await response.json();
        setTransactions(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { transactions, setTransactions, loading, error };
};

export default useStatement;

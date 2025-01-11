import { Statement } from "@/interfaces";
import { useEffect, useState } from "react";

const useStatement = () => {
  const [data, setData] = useState<Statement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/statement");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: Statement = await response.json();
        setData(result);
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

  return { data, loading, error };
};

export default useStatement;

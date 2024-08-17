import { useAppStore } from "@/stores/app.store";
import { useState, useEffect, useCallback } from "react";

const useFetch = (fetchFunction, ...args) => {
  const reFetch = useAppStore((state) => state.isRefecth);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const memoizedFetchFunction = useCallback(
    () => fetchFunction(...args),
    [...args]
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await memoizedFetchFunction();
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setResponse(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [memoizedFetchFunction, reFetch]);

  return [response, loading, error];
};

export default useFetch;

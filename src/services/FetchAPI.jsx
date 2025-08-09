import { useState, useEffect } from "react";

export default function useFetchAPI(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setError(null);
      setLoading(true);
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);
    fetch(url, { signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setError(error.message || 'Error desconocido');
      })
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, [url]);

  return { data, loading, error };
}

import React, { useState, useEffect } from "react";

export const useFetch = <T,>(
  url: string,
  token: string | null,
  initialState: T
): [T, boolean, string | null] => {
  const [data, setData] = useState<T>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          setError("Failed to fetch data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [url, token]);

  return [data, loading, error];
};

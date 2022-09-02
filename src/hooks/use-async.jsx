import { useCallback, useState } from "react";

export const useAsync = (promise) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(() => {
    if (!promise) {
      throw new Error("provide a promise");
    }

    return promise()
      .then(async (response) => {
        const data = await response.json();
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  }, [promise]);

  const reset = () => {
    setData();
    setError();
    setIsLoading(false);
  };

  return { data, error, isLoading, run, reset };
};
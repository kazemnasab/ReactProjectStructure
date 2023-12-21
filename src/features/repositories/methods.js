import { useState, useEffect } from "react";
import { useQuery, QueryCache, useMutation } from "react-query";

export const useApiMyCustomFetch = (queryMethod, reload) => {
  const [result, setResult] = useState({
    isLoading: true,
    status: "",
    message: "",
    data: null,
    headers: "",
  });
  useEffect(() => {
  if (!queryMethod) return;
    setResult({
      ...result,
      isLoading: true,
    });
    var api = queryMethod();
    api.then((res) => {
      setResult({
        ...result,
        status: "success",
        data: res.data,
        headers: res.headers,
        isLoading: false,
      });
    });
    api.catch((res) => {
      setResult({
        ...result,
        status: "error",
        message: res.status + "-" + res.statusText,
        isLoading: false,
      });
    });
    //};
  }, [reload]);

  return result;
};

export const useApiCustomQuery = (key, queryMethod, reload) => {
  const [result, setResult] = useState({
    isLoading: true,
    status: "",
    message: "",
    data: null,
    headers: "",
  });
  const { isLoading: isLoading, refetch: loadRefetch } = useQuery(
    key,
    queryMethod,
    {
      refetchOnMount: false,
      enabled: false,
      onSuccess: (res) => {
        setResult({
          ...result,
          data: res.data,
          headers: res.headers,
          status: "success",
          message: res.status + "-" + res.statusText,
          isLoading,
        });
      },
      onError: (err) => {
        setResult({ ...result, isLoading, message: "error", data: [] });
      },
    }
  );

  useEffect(() => {
    setResult({
      ...result,
      isLoading,
    });
  }, [isLoading]);

  useEffect(() => {
    if (reload) loadRefetch();
  }, [reload]);
  return result;
};

export const useApiCustomMutation = (mutateMethod, reload) => {
  const [result, setResult] = useState({
    isLoading: false,
    status: "",
    message: "",
    data: null,
    headers: "",
  });
  const { isLoading: isLoading, mutate: postData } = useMutation(mutateMethod, {
    refetchOnMount: false,
    enabled: false,
    onSuccess: (res) => {
      setResult({
        ...result,
        data: res.data,
        headers: res.headers,
        status: "success",
        message: res.status + "-" + res.statusText,
        isLoading: isLoading,
      });
    },
    onError: (err) => {
      setResult({ ...result, isLoading, message: "error", data: [] });
    },
  });

  useEffect(() => {
    setResult({
      ...result,
      isLoading: isLoading,
    });
  }, [isLoading]);

  useEffect(() => {
    //if (mutateMethod) //console.log(mutateMethod); //postData();
  }, [mutateMethod]);
  return result;
};

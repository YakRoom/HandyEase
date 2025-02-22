"use client";

import Axios, { AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data
  );

  // @ts-expect-error - This is a workaround to fix the type error
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};

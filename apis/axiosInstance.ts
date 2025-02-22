"use client";
import { errorStore } from "@/lib/errorObserver";
import Axios, { AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response, // Return successful responses
  (error) => {
    console.error("API Request Failed:", error);

    // Capture error details in errorStore
    if (errorStore?.setError) {
      errorStore.setError(error);
    }

    return Promise.reject(error); // Ensure the error is still thrown
  }
);

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

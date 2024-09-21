/* eslint-disable @typescript-eslint/no-unused-vars */
import { getNewAccessToken } from "@/helpers/auth.helpers";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.baseURL = process.env.NEXT_PUBLIC_BASEURL;
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // const responseObject: ResponseSuccessType = {
    //   data: response?.data?.data,
    //   meta: response?.data?.meta,
    // };
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    const config = error?.config;
    if (
      error?.response?.status === 500 ||
      (error?.response?.status === 401 && !config?.sent)
    ) {
      config.sent = true;
      try {
        const response = await getNewAccessToken();
        const accessToken = response?.data?.data?.accessToken;
        config.headers["Authorization"] = accessToken;
        setToLocalStorage("accessToken", accessToken);
      } catch (error) {
        // Clear tokens and redirect to login
        setToLocalStorage("accessToken", "");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // console.log(response);

      return instance(config);
    } else {
      //   const responseObject: ResponseErrorType = {
      //     statusCode: error?.response?.data?.statusCode || 500,
      //     message: error?.response?.data?.message || "Something wen wrong!",
      //     errorMessages: error?.response?.data?.messages,
      //   };
      return Promise.reject(error);
    }
  }
);

export { instance };

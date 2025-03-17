import axios from "axios";
import { envs } from "~/utilities/constant";

const axiosClient = axios.create({
  baseURL: envs.BASE_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    // const authJWTToken = (await getIdToken()) || "";

    // if (authJWTToken)
    //   config.headers.set("Authorization", `Bearer ${authJWTToken}`);

    config.headers["Content-Type"] =
      config?.data?.headerContentType || "application/json";

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;

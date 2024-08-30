import axios from "axios";

const instance = axios.create({
  baseURL: "http://43.202.181.55:8080",
  withCredentials: true,
});

// Request interceptor to add Authorization header
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

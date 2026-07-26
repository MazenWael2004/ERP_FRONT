// Request interceptor to add access token to every request
import { api } from "./axios";

api.interceptors.response.use(
  (response) => {
    const newToken = response.headers["x-access-token"];

    if (newToken) {
      localStorage.setItem("access", newToken);
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 403) { // if code is forbidden.... meaning that token is invalid or expired
      localStorage.removeItem("access");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
import axios from "axios";
import helper from "./tokenStore";

// Create axios instance with baseURL from environment variables
const api = axios.create({
  baseURL: 'http://127.0.0.1:4000', // Base URL from .env file
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor to attach the token if it's not a login request
api.interceptors.request.use(
  function (config) {
    // Skip adding Authorization header for login endpoint
    if (config.url !== "/authenticateService/login") {
      const token = helper.fetchToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors (401)
api.interceptors.response.use(
  (response) => {
    // Handle successful response
    console.log({ "interceptor response": response });
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized error by redirecting to login page
    if (error.response && error.response.status === 401) {
      // Redirect to login page if unauthorized
      window.location.href = "/login";
    }

    return Promise.reject(error); // Reject other errors
  }
);

export default api;

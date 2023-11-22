
import axios from "axios";
import helper from "./tokenStore";
//import { useHistory } from 'react-router-dom';
const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: { "Content-Type": "application/json" },
});
//const history = useHistory();

// Add a request interceptor
api.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		if (config.url !== "/authenticateService/login") {
			config.headers.Authorization = "Bearer " + helper.fetchToken();
		}
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);


// Add a response interceptor to handle token expiration or other authentication-related issues
api.interceptors.response.use(
	(response) => {
	  // Handle successful responses
		console.log({"interceptor response" :response})
	  return response;
	},
	(error) => {
	  // Handle authentication-related errors
	  if (error.response.status === 401) {
		// Redirect the user to the login page or refresh the token
		// You can also clear the local storage or perform any other action as needed
		//alert('Unauthorized. Redirecting to login page.');
		//history.push("/login");
		window.location.href = "/login";
	  }
	  
  
	  return Promise.reject(error);
	}
  );

export default api;

/**
 * owner : 
 * author : 
 */
import api from "./interceptor";

class userService {

    saveCompanyUsers(payload) {
      const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
      return api.post(`${apiUrl}/api/saveCompanyUsers`, payload);
    }

    editCompanyUsers(payload) {
      const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
      return api.post(`${apiUrl}/api/editCompanyUsers`, payload);
    }

    deleteCompanyUsers(payload) {
      const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
      return api.post(`${apiUrl}/api/deleteCompanyUsers`, payload);
    }

    getCompanyUsers() {
      const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getCompanyUsers`)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.error("Error fetching company users:", err);
        });
    }
}

export default new userService();

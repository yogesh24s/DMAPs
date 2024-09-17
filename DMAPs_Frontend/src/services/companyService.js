/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class companyService {
    saveCompanyUsers(payload) {
      const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
      return api.post(`${apiUrl}/api/saveCompanyUsers`, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error("Error saving company users:", err);
      });
    }
}

export default new companyService();

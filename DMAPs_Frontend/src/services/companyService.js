/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class companyService {
    saveCompanyUsers(payload) {
      const apiUrl = 'http://localhost:4000'; // Read base URL from environment
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

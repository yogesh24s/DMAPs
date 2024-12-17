/**
 * owner : 
 * author : 
 */
import api from "./interceptor";

class unitService {
    saveCompanyUnits(payload) {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/saveCompanyUnits/`, payload);
    }

    editCompanyUnits(payload) {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/editCompanyUnits/`, payload);
    }

    deleteCompanyUnits(payload) {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/deleteCompanyUnits/`, payload);
    }
 
    getCompanyUnits() {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getCompanyUnits/`)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.error("Error fetching company units:", err);
        });
    }
}

export default new unitService();

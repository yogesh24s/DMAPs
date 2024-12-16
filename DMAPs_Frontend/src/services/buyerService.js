/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class buyerService {

    saveCompanyBuyers(payload) {
      const apiUrl = 'http://localhost:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/saveBuyers`, payload);
    }

    editCompanyBuyers(payload) {
      const apiUrl = 'http://localhost:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/editBuyers`, payload);
    }

    deleteCompanyBuyers(payload) {
      const apiUrl = 'http://localhost:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/deleteBuyers`, payload);
    }

    getCompanyBuyers() {
      const apiUrl = 'http://localhost:4000'; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getBuyers`)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.error("Error fetching buyers:", err);
        });
    }
}

export default new buyerService();

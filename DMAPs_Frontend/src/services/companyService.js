/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class companyService {
    saveCompanyUsers(payload) {
      return api.post(`http://51.20.104.100:4000/saveCompanyUsers`, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new unitService();

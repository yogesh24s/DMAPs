/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class companyService {
    saveCompanyUsers(payload) {
      return api.post(`http://34.31.105.162:4000/api/saveCompanyUsers`, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new unitService();

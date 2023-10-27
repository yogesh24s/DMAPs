/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class companyService {
    saveCompanyUsers(payload) {
      return api.post(`http://34.93.81.19:4000/saveCompanyUsers`, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new unitService();

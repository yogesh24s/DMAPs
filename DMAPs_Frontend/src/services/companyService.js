/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class companyService {
    saveCompanyUsers(payload) {
      return api.post(`http://3.92.91.120:4000/api/saveCompanyUsers`, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new unitService();

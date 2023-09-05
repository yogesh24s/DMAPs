/**
 * owner : Affine
 * author : Gourav
 */
import api from "./interceptor";

class companyService {
    saveCompanyUsers(payload) {
      return api.post(`/saveCompanyUsers`, payload);
    }
}

export default new unitService();

/**
 * owner : Affine
 * author : Manish & Divyangi
 */
import api from "./interceptor";

class unitService {
    saveCompanyUnits(payload) {
      return api.post(`/saveCompanyUnits`, payload);
    }
    getCompanyUnits(){
        return api
      .get("/getCompanyUnits")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new unitService();

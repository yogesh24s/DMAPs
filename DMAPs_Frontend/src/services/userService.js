/**
 * owner : Affine
 * author :GOurav
 */
import api from "./interceptor";

class userService {
    saveCompanyUsers(payload) {
      return api.post(`/saveCompanyUsers`, payload);
    }
    getCompanyUsers(){
        return api
      .get("/getCompanyUsers")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new userService();

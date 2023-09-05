/**
 * owner : Affine
 * author : Manish & Divyangi
 */
import api from "./interceptor";

class adminService {
	getBasicDetails(){
        return api
      .get("/basicDetails")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new adminService();

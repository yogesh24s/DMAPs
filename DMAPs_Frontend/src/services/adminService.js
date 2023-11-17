/**
 * owner :
 * author : 
 */
import api from "./interceptor";

class adminService {
	getBasicDetails(){
        return api
      .get("http://127.0.0.1:4000/api/basicDetails")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new adminService();

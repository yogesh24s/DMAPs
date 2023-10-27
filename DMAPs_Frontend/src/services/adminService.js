/**
 * owner :
 * author : 
 */
import api from "./interceptor";

class adminService {
	getBasicDetails(){
        return api
      .get("http://34.93.81.19:4000/basicDetails")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new adminService();

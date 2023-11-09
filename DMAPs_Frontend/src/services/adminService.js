/**
 * owner :
 * author : 
 */
import api from "./interceptor";

class adminService {
	getBasicDetails(){
        return api
      .get("http://34.31.105.162:4000/api/basicDetails")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new adminService();

/**
 * owner :
 * author : 
 */
import api from "./interceptor";

class adminService {
	getBasicDetails(){
        return api
      .get("http://51.20.104.100:4000/basicDetails")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new adminService();

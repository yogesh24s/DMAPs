/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class userService {

    saveCompanyUsers(payload) {
      return api.post(`http://34.31.105.162:4000/api/saveCompanyUsers`, payload);
    }
    editCompanyUsers(payload) {
      return api.post(`http://34.31.105.162:4000/api/editCompanyUsers`, payload);
    }

    getCompanyUsers(){
        return api
      .get("http://34.31.105.162:4000/api/getCompanyUsers")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new userService();

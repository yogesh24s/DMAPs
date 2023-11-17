/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class userService {

    saveCompanyUsers(payload) {
      return api.post(`http://127.0.0.1:4000/saveCompanyUsers`, payload);
    }
    editCompanyUsers(payload) {
      return api.post(`http://127.0.0.1:4000/editCompanyUsers`, payload);
    }

    getCompanyUsers(){
        return api
      .get("http://127.0.0.1:4000/getCompanyUsers")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new userService();

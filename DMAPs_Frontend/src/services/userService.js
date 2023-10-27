/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class userService {

    saveCompanyUsers(payload) {
      return api.post(`http://34.93.81.19:4000/saveCompanyUsers`, payload);
    }
    editCompanyUsers(payload) {
      return api.post(`http://34.93.81.19:4000/editCompanyUsers`, payload);
    }

    getCompanyUsers(){
        return api
      .get("http://34.93.81.19:4000/getCompanyUsers")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new userService();

/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class userService {

    saveCompanyUsers(payload) {
      return api.post(`http://51.20.104.100:4000/api/saveCompanyUsers`, payload);
    }
    editCompanyUsers(payload) {
      return api.post(`http://51.20.104.100:4000/api/editCompanyUsers`, payload);
    }

    deleteCompanyUsers(payload) {
      return api.post(`http://51.20.104.100:4000/api/deleteCompanyUsers`, payload);
    }

    getCompanyUsers(){
        return api
      .get("http://51.20.104.100:4000/api/getCompanyUsers")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new userService();

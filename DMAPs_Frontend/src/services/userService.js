/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class userService {

    saveCompanyUsers(payload) {
      return api.post(`http://3.92.91.120:4000/api/saveCompanyUsers`, payload);
    }
    editCompanyUsers(payload) {
      return api.post(`http://3.92.91.120:4000/api/editCompanyUsers`, payload);
    }

    deleteCompanyUsers(payload) {
      return api.post(`http://3.92.91.120:4000/api/deleteCompanyUsers`, payload);
    }

    getCompanyUsers(){
        return api
      .get("http://3.92.91.120:4000/api/getCompanyUsers")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new userService();

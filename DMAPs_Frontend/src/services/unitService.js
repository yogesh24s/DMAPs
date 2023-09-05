/**
 * owner : 
 * author : 
 */
import api from "./interceptor";

class unitService {

    saveCompanyUnits(payload) {
      return api.post(`http://127.0.0.1:4000/saveCompanyUnits/`, payload)
    }
    
    getCompanyUnits(){
        return api
      .get("http://127.0.0.1:4000/getCompanyUnits/")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new unitService();

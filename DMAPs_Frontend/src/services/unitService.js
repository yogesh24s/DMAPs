/**
 * owner : 
 * author : 
 */
import api from "./interceptor";

class unitService {
    saveCompanyUnits(payload) {
      return api.post(`http://51.20.104.100:4000/api/saveCompanyUnits/`, payload)
    }

    editCompanyUnits(payload) {
      return api.post(`http://51.20.104.100:4000/api/editCompanyUnits/`, payload)
    }

    deleteCompanyUnits(payload) {
      return api.post(`http://51.20.104.100:4000/api/deleteCompanyUnits/`, payload)
    }
 
    getCompanyUnits(){
        return api
      .get("http://51.20.104.100:4000/api/getCompanyUnits/")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new unitService();
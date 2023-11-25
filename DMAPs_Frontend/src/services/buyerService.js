/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class buyerService {

    saveCompanyBuyers(payload) {
      return api.post(`http://51.20.104.100:4000/api/saveBuyers`, payload);
    }
    editCompanyBuyers(payload) {
      return api.post(`http://51.20.104.100:4000/api/editBuyers`, payload);
    }

    deleteCompanyBuyers(payload) {
      return api.post(`http://51.20.104.100:4000/api/deleteBuyers`, payload);
    }

    getCompanyBuyers(){
        return api
      .get("http://51.20.104.100:4000/api/getBuyers")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new buyerService();

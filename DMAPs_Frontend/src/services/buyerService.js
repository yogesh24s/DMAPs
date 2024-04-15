/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class buyerService {

    saveCompanyBuyers(payload) {
      return api.post(`http://127.0.0.1:4000/api/saveBuyers`, payload);
    }
    editCompanyBuyers(payload) {
      return api.post(`http://127.0.0.1:4000/api/editBuyers`, payload);
    }

    deleteCompanyBuyers(payload) {
      return api.post(`http://127.0.0.1:4000/api/deleteBuyers`, payload);
    }

    getCompanyBuyers(){
        return api
      .get("http://127.0.0.1:4000/api/getBuyers")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
}

export default new buyerService();

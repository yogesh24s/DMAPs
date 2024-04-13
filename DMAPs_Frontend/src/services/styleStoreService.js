/**
 * owner : 
 * author : 
 */
import api from "./interceptor";

class styleStoreService {
    getStyleEntry(){
      return api
      .get("http://3.92.91.120:4000/api/getStyleEntry/")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }
    
    saveStyleEntry(payload) {
      return api.post(`http://3.92.91.120:4000/api/saveStyleEntry/`, payload)
    }

    editStyleEntry(payload) {
      return api.post(`http://3.92.91.120:4000/api/editStyleEntry/`, payload)
    }

    deleteStyleEntry(payload) {
      return api.post(`http://3.92.91.120:4000/api/deleteStyleEntry/`, payload)
    }

    getPODetails(){
      return api
      .get("http://3.92.91.120:4000/api/getPODetails/")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
    }

    savePODetails(payload) {
      return api.post(`http://3.92.91.120:4000/api/savePODetails/`, payload)
    }

    editPODetails(payload) {
      return api.post(`http://3.92.91.120:4000/api/editPODetails/`, payload)
    }

    deletePODetails(payload) {
      return api.post(`http://3.92.91.120:4000/api/deletePODetails/`, payload)
    }

}

export default new styleStoreService();
/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class embTypeService {

    saveEmbType(payload) {
      
      // alert(payload)
      const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/saveEmbType`, payload);
    }

    getEmbType() {
      const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getEmbType`)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.error("Error fetching buyers:", err);
        });
    }


    updateEmbType(payload) {
      const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/updateEmbType`, payload);
    }

    // editCompanyBuyers(payload) {
    //   const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
    //   return api.post(`${apiUrl}/api/editBuyers`, payload);
    // }

    deleteEmbType(payload) {
      const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/deleteEmbType`, payload);
    }

    // getCompanyBuyers() {
    //   const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
    //   return api
    //     .get(`${apiUrl}/api/getBuyers`)
    //     .then((response) => {
    //       return response;
    //     })
    //     .catch((err) => {
    //       console.error("Error fetching buyers:", err);
    //     });
    // }
}

export default new embTypeService();

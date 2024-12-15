/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class washingTypeService {

    saveWashingType(payload) {
      
      // alert(payload)
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/saveWashingType`, payload);
    }

    getWashingType() {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getWashingType`)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.error("Error fetching buyers:", err);
        });
    }

    updateWashingType(payload) {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/updateWashingType`, payload);
    }

    deleteWashingRecord(payload) {
      
      console.log(payload);
      
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/deletewashingType`, payload);
    }

    // getCompanyBuyers() {
    //   const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
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

export default new washingTypeService();

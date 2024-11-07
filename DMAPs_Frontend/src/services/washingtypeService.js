/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class washingTypeService {

    saveWashingType(payload) {
      debugger
      // alert(payload)
      const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/saveWashingType`, payload);
    }

    getWashingType() {
      const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getWashingType`)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.error("Error fetching buyers:", err);
        });
    }

    // editCompanyBuyers(payload) {
    //   const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
    //   return api.post(`${apiUrl}/api/editBuyers`, payload);
    // }

    deleteWashingRecord(payload) {
      debugger
      console.log(payload);
      
      const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
      return api.post(`${apiUrl}/api/deletewashingType`, payload);
    }

    // getCompanyBuyers() {
    //   const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
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

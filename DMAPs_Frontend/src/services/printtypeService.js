/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class printTypeService {

    savePrintType(payload) {
      debugger
      // alert(payload)
      const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/savePrintType`, payload);
    }

    getPrintType() {
      const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getPrintType`)
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

    // deleteCompanyBuyers(payload) {
    //   const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
    //   return api.post(`${apiUrl}/api/deleteBuyers`, payload);
    // }

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

export default new printTypeService();

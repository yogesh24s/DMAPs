/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class sizeGridService {

    saveSizeGrid(payload) {
      debugger
      const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/saveSizeGrid`, payload);
    }

    getSizeGrid() {
      const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getSizeGrid`)
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

export default new sizeGridService();

/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class sizeGridService {

    saveSizeGrid(payload) {
      
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/saveSizeGrid`, payload);
    }

    getSizeGrid() {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getSizeGrid`)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.error("Error fetching buyers:", err);
        });
    }

    updateSizeGrid(payload) {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/updateSizeGrid`, payload);
    }


    // editCompanyBuyers(payload) {
    //   const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
    //   return api.post(`${apiUrl}/api/editBuyers`, payload);
    // }

    deleteSizeGrid(payload) {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/deleteSizeGrid`, payload);
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

export default new sizeGridService();

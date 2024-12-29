/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class colorService {

    saveColor(payload) {
      
      // alert(payload)
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/saveColor`, payload);
    }

    getColor() {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getColor`)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.error("Error fetching buyers:", err);
        });
    }

    updateColor(payload) {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/updateColor`, payload);
    }

    deleteColor(payload) {      
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/deleteColor`, payload);
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

export default new colorService();

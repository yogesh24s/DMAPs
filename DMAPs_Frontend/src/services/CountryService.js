/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class countryService {

    saveCountry(payload) {
      
      // alert(payload)
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/saveCountry`, payload);
    }

    getCountry() {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getCountry`)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.error("Error fetching buyers:", err);
        });
    }

    updateCountry(payload) {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/updateCountry`, payload);
    }

    deleteCountry(payload) {      
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/deleteCountry`, payload);
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

export default new countryService();

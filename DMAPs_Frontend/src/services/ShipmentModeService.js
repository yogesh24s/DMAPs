/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class shipmentModeService {

    saveShipmentMode(payload) {
      
      // alert(payload)
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/saveShipmentMode`, payload);
    }

    getShipmentMode() {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getShipmentMode`)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.error("Error fetching buyers:", err);
        });
    }

    updateShipmentMode(payload) {
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/updateShipmentMode`, payload);
    }

    deleteShipmentMode(payload) {      
      const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/deleteShipmentMode`, payload);
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

export default new shipmentModeService();

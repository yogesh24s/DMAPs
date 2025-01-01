/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class productTYpeService {

    saveProductType(payload) {
      // alert(payload)
      const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/saveProductType`, payload);
    }

    getProductType() {
      const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getProductType`)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.error("Error fetching buyers:", err);
        });
    }

    editProductType(payload) {
      const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/editProductType`, payload);
    }

    // editCompanyBuyers(payload) {
    //   const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
    //   return api.post(`${apiUrl}/api/editBuyers`, payload);
    // }

    deleteProductType(payload) {
      const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/deleteProductType`, payload);
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

export default new productTYpeService();

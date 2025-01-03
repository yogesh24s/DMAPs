/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class seasonService {

    saveSeason(payload) {
      
      const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/saveSeason`, payload);
    }

    getSeason() {
      const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
      return api
        .get(`${apiUrl}/api/getSeason`)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.error("Error fetching buyers:", err);
        });
    }

    updateSeason(payload) {  
      const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
      console.log(payload)
      return api.post(`${apiUrl}/api/updateSeason`, payload);
    }


    // editCompanyBuyers(payload) {
    //   const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
    //   return api.post(`${apiUrl}/api/editBuyers`, payload);
    // }

    deleteSeasonType(payload) {
      const apiUrl = 'http://127.0.0.1:4000'; // Read base URL from environment
      return api.post(`${apiUrl}/api/deleteSeason`, payload);
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

export default new seasonService();

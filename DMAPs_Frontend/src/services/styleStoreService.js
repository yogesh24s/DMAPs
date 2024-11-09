/**
 * owner : 
 * author : 
 */
import api from "./interceptor";

const apiUrl = 'http://localhost:4000'; // Base URL from environment variable

class styleStoreService {
  
  getStyleEntry() {
    return api
      .get(`${apiUrl}/api/getStyleEntry/`) // Use environment variable
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error("Error fetching style entry:", err);
      });
  }
  
  saveStyleEntry(payload) {
    return api.post(`${apiUrl}/api/saveStyleEntry/`, payload); // Use environment variable
  }

  editStyleEntry(payload) {
    return api.post(`${apiUrl}/api/editStyleEntry/`, payload); // Use environment variable
  }

  deleteStyleEntry(payload) {
    return api.post(`${apiUrl}/api/deleteStyleEntry/`, payload); // Use environment variable
  }

  getPODetails() {
    return api
      .get(`${apiUrl}/api/getPODetails/`) // Use environment variable
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error("Error fetching PO details:", err);
      });
  }

  savePODetails(payload) {
    return api.post(`${apiUrl}/api/savePODetails/`, payload); // Use environment variable
  }

  editPODetails(payload) {
    return api.post(`${apiUrl}/api/editPODetails/`, payload); // Use environment variable
  }

  deletePODetails(payload) {
    return api.post(`${apiUrl}/api/deletePODetails/`, payload); // Use environment variable
  }

  getStyleLookupDetails() {
    return api
      .get(`${apiUrl}/api/getStyleLookupDetails/`) // Use environment variable
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error("Error fetching style lookup details:", err);
      });
  }

}

export default new styleStoreService();

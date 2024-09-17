// import api from "./interceptor";
import api from "./interceptor";

class adminService {
  getBasicDetails() {
    const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
    return api
      .get(`${apiUrl}/api/basicDetails`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        // Handle errors and show meaningful messages
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("An error occurred. Please try again.");
        }
      });
  }
}

export default new adminService();

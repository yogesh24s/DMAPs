//import api from "./interceptor";
import api from "./interceptor";
class adminService {
  getBasicDetails() {
    // let token = localStorage.getItem("token");
    // const headers = {
    //   "Content-Type": "application/json",
    //   "Authorization": `Bearer ${token}`,
    // };
    // console.log({headers});
    return api
      .get("http://3.92.91.120:4000/api/basicDetails")
      .then((response) => {
        return response;
      })
      .catch((err) => {
        // Handle errors
       // alert(err.message)
        alert(err.response.data.message);
      });
  }
}

export default new adminService();

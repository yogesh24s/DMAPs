/**
 * owner : 
 * author : 
 */
import api from "./interceptor";

class loginService {
  login(payload) {
    return api.post(`http://127.0.0.1:4000/login/`, payload)
  }
  forgotPassword(payload) {
    return api.post(`http://127.0.0.1:4000/api/forgotPassword`, payload)
  }

  changePassword(payload) {
    return api.post(`http://127.0.0.1:4000/changePassword`, payload)
  }

  logout() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("fullName");
    sessionStorage.removeItem("temporary");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("crb");
    localStorage.removeItem("lsqah");
    sessionStorage.removeItem("aul");
  }
}

export default new loginService();

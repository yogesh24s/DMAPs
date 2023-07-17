/**
 * owner : 
 * author : 
 */
import api from "./interceptor";

class loginService {
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

/**
 * owner : 
 * author : 
 */
import api from "./interceptor";

class loginService {
  login(payload) {
    const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
    return api.post(`${apiUrl}/login/`, payload);
  }

  forgotPassword(payload) {
    const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
    return api.post(`${apiUrl}/api/forgotPassword`, payload);
  }

  changePassword(payload) {
    const apiUrl = process.env.REACT_APP_API_URL; // Read base URL from environment
    return api.post(`${apiUrl}/changePassword`, payload);
  }

  logout() {
    // Remove all user-related session and local storage data
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

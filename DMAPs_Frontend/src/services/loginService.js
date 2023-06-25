/**
 * owner : retrAIver
 * author : Manish and Divyangi from Affine
 */
import api from "./interceptor";

class loginService {
  keyCloakLogin(payload) {
    //return axios.post(`${baseURL}/login/`, payload, { headers: headers });
    return api.post(`/authenticateService/login`, payload);
  }

  keyCloakForgotPassword(payload) {
    //return axios.post(`${baseURL}/login/`, payload, { headers: headers });
    return api.post(`/forgotpassword`, payload);
  }

  keyCloakChangePassword(payload) {
    //return axios.post(`${baseURL}/login/`, payload, { headers: headers });
    return api.post(`/changepassword`, payload);
  }

  keyCloakResetPassword(payload) {
    //return axios.post(`${baseURL}/login/`, payload, { headers: headers });
    return api.post(`/resetpassword`, payload);
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

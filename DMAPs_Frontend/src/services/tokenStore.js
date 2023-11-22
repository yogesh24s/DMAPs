/**
 * owner : 
 * author : 
 */

class helperService {
  setToken = (token) => {
     //token ="1234"
    sessionStorage.setItem("accessToken", token); // make up your own token
  };

  setRefreshToken = (token) => {
    sessionStorage.setItem("refreshToken", token); // make up your own token
  };

  setRole = (role) => {
    sessionStorage.setItem("userRole", role); // make up your own token
  };

  fetchToken = () => {
    return sessionStorage.getItem("accessToken");
  };

  getRole = () => {
    return sessionStorage.getItem("userRole"); // make up your own token
  };

  fetchRefreshToken = () => {
    return sessionStorage.getItem("refreshToken");
  };

  setQA = (obj) => {
    return localStorage.setItem("lsqah", JSON.stringify(obj));
  };

  getQA = () => {
    return localStorage.getItem("lsqah");
  };

  setUserId = (obj) => {
    return sessionStorage.setItem("userId", obj);
  };

  getUserId = () => {
    return sessionStorage.getItem("userId");
  };

  setUserName = (obj) => {
    return sessionStorage.setItem("userName", obj);
  };

  getUserName = () => {
    return sessionStorage.getItem("userName");
  };

  setTemporaryPasswordFlag = (obj) => {
    return sessionStorage.setItem("temporary", obj);
  };

  getTemporaryPasswordFlag = () => {
    return sessionStorage.getItem("temporary");
  };

  setUserName = (userName) => {
    return sessionStorage.setItem("userName", userName);
  };

  getUserName = () => {
    return sessionStorage.getItem("userName");
  };

  setCreditBalance = (amount) => {
    return sessionStorage.setItem("crb", amount);
  }

  getCreditBalance = () => {
    return sessionStorage.getItem("crb");
  };

  setAvailableLicense = (count) =>{
    return sessionStorage.setItem("aul", count);
  }

  getAvailableLicense = () => {
    return sessionStorage.getItem("aul");
  };
  removeToken = () =>{
    return sessionStorage.clear()
  }
}

export default new helperService();

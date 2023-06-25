/**
 * owner : 
 * author : 
 */

class helperService {
  setToken = (token) => {
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

  setFullName = (obj) => {
    return sessionStorage.setItem("fullName", obj);
  };

  getFullName = () => {
    return sessionStorage.getItem("fullName");
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

  checkLicense = () => {
      // check if the license is still valid for the product
      return fetch(process.env.REACT_APP_API_URL+"/licenseService/checklicense")
        .then((response) => response.json())
        .then((data) => {
          if (data["message"] !== "passed"){
              //console.log('returning data')
              return data["message"]
          }
          else{
            //console.log('returning passed')
            return "passed"
          }
    });
  }
}

export default new helperService();

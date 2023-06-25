/**
 * owner : Affine
 * author : Divyangi from Affine
 */
import api from "./interceptor";

class transactionService {
  addCreditsForUser(obj) {
    const payload = obj;
    return api.post(`/purchase-credits`, payload);
  }

  getTransactionHistory(filterObj) {
    let startdate = filterObj.startdate;
    let enddate = filterObj.enddate;
    return api
      .get(`/credit-history/?startdate=${startdate}&enddate=${enddate}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {});
  }
}

export default new transactionService();

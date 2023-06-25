/**
 * owner : retrAIver
 * author : Divyangi from Affine
 */
import api from "./interceptor";

class qnaService {
  getLastAskedQuestionsList(query) {
    return api
      .get(`/getuserqueryhistory`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getQueryAnswer(query) {
    return api
      .get(`/getQueryResponse/?query=${query}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateFeedback(feedbackParam) {
    let id = feedbackParam.Id;
    let feedback = feedbackParam.status;
    return api
      .put(`/updateFeedback/${id}?feedback=${feedback}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new qnaService();

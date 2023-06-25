/**
 * owner : retrAIver
 * author : Manish from Affine
 */
import api from "./interceptor";

class documentService {
  uploadFiles(file, remarks) {
    const payload = new FormData();
    payload.append("remarks", remarks);
    file.forEach((ele, i) => {
      payload.append("files", ele);
    });
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return api.post(`/documentService/uploadfile/`, payload, config);
  }

  getAllDocuments() {
    return api
      .get("documentService/uploaded_files_list/")
      .then((response) => {
        return response;
      })
      .catch((err) => {});
  }
}

export default new documentService();

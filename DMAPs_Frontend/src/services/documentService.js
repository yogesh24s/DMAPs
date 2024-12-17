/**
 * owner : 
 * author :
 */
import api from "./interceptor";

class documentService {
  uploadFiles(file, remarks) {
    const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment
    const payload = new FormData();
    
    payload.append("remarks", remarks);
    file.forEach((ele) => {
      payload.append("files", ele);
    });

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    return api.post(`${apiUrl}/documentService/uploadfile/`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error("Error uploading files:", err);
      });
  }

  getAllDocuments() {
    const apiUrl = 'http://3.92.91.120:4000'; // Read base URL from environment

    return api
      .get(`${apiUrl}/documentService/uploaded_files_list/`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error("Error fetching documents list:", err);
      });
  }
}

export default new documentService();

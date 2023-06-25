/**
 * owner : Affine
 * author : Manish & Divyangi
 */
import api from "./interceptor";

class adminService {
	getUserList() {
		return api
			.get(`/adminview`)
			.then((response) => {
				return response;
			})
			.catch((err) => {});
	}

	getUserRoleList() {
		return api
			.get(`/getKeycloakRole`)
			.then((response) => {
				return response;
			})
			.catch((err) => {});
	}

	createUser(params){
		return api.post(`/createKeycloakUser`, params)
		.then((response) => {
			return response;
		})
		  .catch((err) => {
			alert(err.response.data.error);
		});
	}

	updateUser(params){
		return api.post(`/updateKeycloakUser`, params)
		.then((response) => {
			return response;
		})
		  .catch((err) => {
			alert(err.response.data.error);
		});
	}

	changeUserStatus(userName,status){
		return api.post(`/changeUserStatus`, {"user_name":userName,"status":status})
		.then((response) => {
			return response;
		  })
		  .catch((err) => {
			alert(err.response.data.error);
		  });
	}

	getCreditPoolBalance() {
		return api
			.get(`/getCreditPoolBalance`)
			.then((response) => {
				return response;
			})
			.catch((err) => {});
	}

	manageCreditPool(payload){
		return api.post(`/manageCreditPool`, payload)
		.then((response) => {
			return response;
		  })
		  .catch((err) => {
			alert(err.response.data.message);
		  });
	}
}

export default new adminService();

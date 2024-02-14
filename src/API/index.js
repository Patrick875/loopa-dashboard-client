import axios from "axios";
import Cookie from "js-cookie";
import { serverUrl } from "../constants";
const instance = axios.create({ baseURL: serverUrl });

instance.interceptors.response.use(
	function (response) {
		if (response.data && response.data.user) {
			Cookie.set("token", response.data.token, { expires: 30 });
			Cookie.set(
				"user",
				JSON.stringify({
					email: response.data.user.email,
					id: response.data.user._id,
					fullname: response.data.user.fullname,
					telephone: response.data.user.telephone,
					role: response.data.user.role,
				}),
				{ expires: 30 }
			);
		}
		return response;
	},
	function (error) {
		console.log(error);
		return Promise.reject(error);
	}
);

export default instance;

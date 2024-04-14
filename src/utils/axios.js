import axios from "axios";
import constants from "../constants";
const { baseAIUrl, timeout } = constants;

const instance = axios.create({
	baseURL: baseAIUrl,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: timeout,
});

export default instance;

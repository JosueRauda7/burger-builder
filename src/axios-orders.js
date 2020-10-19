import axios from "axios";

const instance = axios.create({
	baseURL: "https://react-rauda-burger.firebaseio.com/",
});

export default instance;

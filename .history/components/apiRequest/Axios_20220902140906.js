import axios from "axios";

const instance = axios.create({
    baseURL: "http://68.183.189.245:3001/api"
});

export default instance;
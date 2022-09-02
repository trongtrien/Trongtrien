import axios from "axios";

const instance = axios.create({
    baseURL: "http://doc.vie-ko.com/api"
});

export default instance;
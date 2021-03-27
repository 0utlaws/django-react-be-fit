import axios from "axios";

export default class API {

    static userLogin = (data) => {
        return axios.post('http://127.0.0.1:8000/auth/', data)
          .then(response => response.data)
    };
};
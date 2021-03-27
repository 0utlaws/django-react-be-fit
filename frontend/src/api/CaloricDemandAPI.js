import axios from "axios";

export default class CaloricDemandAPI {
    static getCaloricDemand = (token) => {
        return axios.get('http://127.0.0.1:8000/api/caloric_demand/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.data)
    }

    static updateCaloricDemand = (data, token) => {
        return axios.put('http://127.0.0.1:8000/api/caloric_demand/', data, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.data)
    }
}
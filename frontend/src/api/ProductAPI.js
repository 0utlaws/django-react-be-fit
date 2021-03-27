import axios from "axios";

export default class ProductAPI {

    static getProducts = (token) => {
        return axios.get("http://127.0.0.1:8000/api/products/", {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
    };

    static createProduct = (data, token) => {
        return axios.post('http://127.0.0.1:8000/api/products/', data, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.data)
    };

    static updateProduct = (product_id, data, token) => {
        return axios.put(`http://127.0.0.1:8000/api/products/${product_id}/`, data, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.data)
    };

    static deleteProduct = (product_id, token) => {
        return axios.delete(`http://127.0.0.1:8000/api/products/${product_id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
    };

    static createProductInMeal = (data, token) => {
        return axios.post('http://127.0.0.1:8000/api/products/product_in_meal/', data, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.data)
    };
};
import axios from "axios";

export default class MealsIngredientsAPI {
    static createMealIngredient = (data, token) => {
        return axios.post('http://127.0.0.1:8000/api/meals_ingredients/', data, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.data)
    }

    static getMealIngredient = (ingredient_id, token) => {
        return axios.get(`http://127.0.0.1:8000/api/meal_ingredient/${ingredient_id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.data)
    }

    static updateMealIngredient = (ingredient_id, data, token) => {
        return axios.put(`http://127.0.0.1:8000/api/meal_ingredient/${ingredient_id}/`, data, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.data)
    }

    static deleteIngredient = (ingredient_id, token) => {
        return axios.delete(`http://127.0.0.1:8000/api/meal_ingredient/${ingredient_id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
    }
}
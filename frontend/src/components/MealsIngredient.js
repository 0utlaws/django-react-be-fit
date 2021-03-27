import React from "react";
import MealsIngredientsAPI from "../api/MealsIngredientsAPI";
import { useCookies } from "react-cookie";

const MealsIngredient = ({ingredient, switchContent, switchForm, deleteMealI}) => {

    const [token] = useCookies(['mr-token'])
    const {id, product_name, calories, protein, carbo, fat} = ingredient;

    const openEditForm = () => {
        MealsIngredientsAPI.getMealIngredient(id, token['mr-token'])
          .then(mealI => switchContent(mealI))
          .catch(error => console.log(error))
        switchForm("edit");
    }

    return (
        <div className="meal-item">
            <span>{product_name}</span>
            <span>{calories}</span>
            <span>{protein}</span>
            <span>{carbo}</span>
            <span>{fat}</span>
            <span className="actions">
                <button onClick={openEditForm}>Edit</button>
                <button onClick={() => deleteMealI(id)}>Delete</button>
            </span>
        </div>
    )
};

export default MealsIngredient;
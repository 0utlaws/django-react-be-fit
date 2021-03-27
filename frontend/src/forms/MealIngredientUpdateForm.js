import React, { useEffect } from "react"; 
import useInput from "../hooks/useInput";


const MealIngredientUpdateForm = (props) => {

    const [fields, handleFieldChange, setFields] = useInput({
        "meal": "",
        "amount": ""
    });

    useEffect(() => {
        if(props.mealI) {
            const {meal, amount} = props.mealI;
            setFields({
                "meal": meal,
                "amount": amount
            });
        };
    }, [props.mealI]);

    const updateMealIngredient = () => {
        props.updateMealIngredient(props.mealI.id, props.mealI.diary, fields.meal, props.mealI.product, fields.amount);
        props.switchForm("create");
    };

    return (
        <div className="form">
            <h1>Update</h1>
            <label>
                Meal
                <select name="meal" value={fields.meal} onChange={handleFieldChange}>
                    <option value="1">Breakfast</option>
                    <option value="2">Lunch</option>
                    <option value="3">Dinner</option>
                    <option value="4">Snacks</option>
                </select>
            </label>
            <label>
                Amount
                <input 
                  type="number" 
                  name="amount" 
                  value={fields.amount} 
                  onChange={handleFieldChange}
                />
            </label>
            <button onClick={updateMealIngredient}>Update</button>
            <button className="addtnl-btn" onClick={() => props.switchForm("create")}>Creation form</button>
        </div>
    )
};

export default MealIngredientUpdateForm;
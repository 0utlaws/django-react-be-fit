import useInput from "../hooks/useInput";


const initialValues = {
    name: "",
    protein: "",
    calories: "",
    carbohydrates: "",
    fat: "",
    amount: "",
    meal: "1"
}

const NewProductInMealForm = (props) => {

    const [fields, handleFieldChange, setFields] = useInput(initialValues);

    const createMealIngredient = () => {
        props.createMealIngredient(fields);
        setFields(initialValues);
    };

    return (
        <div className="form">
            <h1>Create</h1>
            <label>
                Name
                <input 
                  type="text" 
                  name="name" 
                  value={fields.name} 
                  onChange={handleFieldChange} 
                />
            </label>
            <label>
                Calories
                <input 
                  type="number" 
                  name="calories" 
                  value={fields.calories} 
                  onChange={handleFieldChange} 
                />
            </label>
            <label>
                Protein
                <input 
                  type="number" 
                  name="protein" 
                  value={fields.protein} 
                  onChange={handleFieldChange} 
                />
            </label>
            <label>
                Carbohydrates
                <input
                   type="number" 
                   name="carbohydrates" 
                   value={fields.carbohydrates} 
                   onChange={handleFieldChange} 
                />
            </label>
            <label>
                Fat
                <input 
                  type="number" 
                  name="fat" 
                  value={fields.fat} 
                  onChange={handleFieldChange} 
                />
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
            <label>
                Meal
                <select name="meal" value={fields.meal} onChange={handleFieldChange}>
                    <option value="1">Breakfast</option>
                    <option value="2">Lunch</option>
                    <option value="3">Dinner</option>
                    <option value="4">Snacks</option>
                </select>
            </label>
            <button onClick={createMealIngredient}>Create</button>
            <button className="addtnl-btn" disabled={props.products.length ? false : true} onClick={() => props.switchForm("use")}>Use product</button>
        </div>
    )
};

export default NewProductInMealForm;
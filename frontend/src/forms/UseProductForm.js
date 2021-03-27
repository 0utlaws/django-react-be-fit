import useInput from "../hooks/useInput";

const UseProductForm = (props) => {

    const [fields, handleFieldChange, setFields] = useInput({
        amount: "",
        product: props.products[0].id,
        meal: "1"
    });

    const useProduct = () => {
        props.useProduct(fields);
        setFields({
            amount: "",
            meal: "1",
            product: props.products[0].id
        });
    };
 
    return (
        <div className="form">
            <h1>Use product</h1>
            <label>
                Product
                <select name="product" value={fields.product} onChange={handleFieldChange}>
                    {props.products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                </select>
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
            <label>
                Amount
                <input 
                  type="number" 
                  name="amount" 
                  value={fields.amount} 
                  onChange={handleFieldChange}
                />
            </label>
            <button onClick={useProduct}>Use</button>
            <button className="addtnl-btn" onClick={() => props.switchForm("create")}>Creation form</button>
        </div>
    )
};

export default UseProductForm;
import React, { useEffect } from "react";
import useInput from "../hooks/useInput";


const initialValues = {
    name: "",
    calories: "",
    protein: "",
    carbohydrates: "",
    fat: ""
}

const ProductForm = (props) => {

    const [fields, handleFieldChange, setFields] = useInput(initialValues);
    
    useEffect(() => {
        if(props.product) {
            const {name, calories, protein, carbohydrates, fat} = props.product;
            setFields({
                name,
                calories,
                protein,
                carbohydrates,
                fat
            });
        };
    }, [props.product]);


    const createProduct = () => {
        props.createProduct(fields);
        setFields(initialValues);
    };

    const updateProduct = () => {
        props.updateProduct(props.product.id, fields);
        setFields(initialValues);
    };

    const openCreateForm = () => {
        props.switchContent(null);
        setFields(initialValues);
    };

    return (
        <div className="form">
            <h1>{props.product ? "Edit" : "Create"}</h1>
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
            {props.product ?
                <>
                    <button onClick={updateProduct}>Update</button>
                    <button className="addtnl-btn" onClick={openCreateForm}>Creation form</button>
                </>
            :
                <button onClick={createProduct}>Create</button>
            }   
        </div>
    )
};

export default ProductForm;
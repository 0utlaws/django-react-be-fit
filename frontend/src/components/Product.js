import React from "react";

const Product = ({product, switchContent, switchForm, deleteProduct}) => {
    const {name, calories, protein, carbohydrates, fat} = product;

    const openEditForm = () => {
        switchContent(product);
        switchForm(true);
    };

    const openUseForm = () => {
        switchContent(product);
        switchForm(false);
    };

    return (
        <div className="product-item">
            <span>{name}</span>
            <span>{calories}</span>
            <span>{protein}</span>
            <span>{carbohydrates}</span>
            <span>{fat}</span>
            <span className="actions">
                <button onClick={openUseForm}>Use in meal</button>
                <button onClick={openEditForm}>Edit</button>
                <button onClick={() => deleteProduct(product)}>Delete</button>
            </span>
        </div>
    )
};

export default Product;
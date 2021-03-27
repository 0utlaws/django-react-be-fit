import React, { useEffect, useState } from "react";
import "../styles/ProductList.css";
import Product from "./Product";
import ProductForm from "../forms/ProductForm";
import UseInMealForm from "../forms//UseInMealForm";
import ProductAPI from "../api/ProductAPI";
import DiaryAPI from "../api/DiaryAPI";
import MealsIngredientsAPI from "../api/MealsIngredientsAPI";
import { useCookies } from "react-cookie";

const ProductList = () => {
    const [token] = useCookies(['mr-token']);
    const [products, setProducts] = useState([]);
    const [diarys, setDiarys] = useState([]);
    const [activeContent, setActiveContent] = useState(null);
    const [activeForm, setActiveForm] = useState(true);

    useEffect(() => {
        ProductAPI.getProducts(token['mr-token'])
          .then(response => setProducts(response.data))
          .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        DiaryAPI.getDiarys(token['mr-token'])
          .then(response => setDiarys(response.data))
          .catch(error => console.log(error))
    }, []);

    const handleCreateClick = (values) => {
        const { name, calories, protein, carbohydrates, fat } = values;
        ProductAPI.createProduct({name, calories, protein, carbohydrates, fat}, token['mr-token'])
        .then(product => {
            const newProducts = [...products, product]
            setProducts(newProducts)
        })
        .catch(error => console.log(error))  
    };

    const handleUpdateClick = (product_id, values) => {
        const { name, calories, protein, carbohydrates, fat} = values;
        ProductAPI.updateProduct(product_id, {name, calories, protein, carbohydrates, fat}, token['mr-token'])
          .then(product => {
              const newProducts = products.map(prod => prod.id === product.id ? product : prod)
              setProducts(newProducts);
              setActiveContent(null);
          })
          .catch(error => console.log(error))  
    };

    const handleUseClick = (product, values) => {
        const { meal, diary, amount } = values;
        MealsIngredientsAPI.createMealIngredient({diary, meal, product, amount}, token['mr-token'])
          .then(response => console.log(response.data))
          .catch(error => console.log(error));
    };

    const handleDeleteClick = (product) => {
        ProductAPI.deleteProduct(product.id, token['mr-token'])
          .then(() => {
             const newProducts = products.filter(prod => prod.id !== product.id)
             setProducts(newProducts)
          })
          .catch(error => console.log(error))
    };

    const handleSwitchClick = (value) => {
        setActiveForm(value);
    };

    const handleContentClick = (value) => {
        setActiveContent(value);
    };

    return (
        <div className="container">
             <div className="main-content">
                 <div className="list-heading product-list-hdg">
                    <span>Name</span>
                    <span>Calories</span>
                    <span>Protein (g)</span>
                    <span>Carbo (g)</span>
                    <span>Fat (g)</span>
                    <span className="product-actions-heading">Actions</span>
                 </div>

                 {products.length ? 
                    products.map(product => (
                        <Product 
                          key={product.id} 
                          product={product}
                          deleteProduct={handleDeleteClick}
                          switchContent={handleContentClick} 
                          switchForm={handleSwitchClick}
                        />))
                :
                    <div className="empty-list">
                        <p>No products</p>
                    </div>
                }
            </div>
            <div className="form-container">
                {activeForm ?
                    <ProductForm
                        product={activeContent}
                        createProduct={handleCreateClick}
                        updateProduct={handleUpdateClick}
                        switchContent={handleContentClick}
                    />
                :
                    <UseInMealForm
                        product={activeContent}
                        diarys={diarys}
                        useProduct={handleUseClick}
                        switchContent={handleContentClick}
                        switchForm={handleSwitchClick}
                    />
                } 
            </div>
        </div>
    )
};

export default ProductList;
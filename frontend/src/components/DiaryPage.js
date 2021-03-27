import React, { useEffect, useState } from "react";
import "../styles/MealList.css";
import { useCookies } from "react-cookie";
import MealsIngredient from "./MealsIngredient";
import DiaryAPI from "../api/DiaryAPI";
import ProductAPI from "../api/ProductAPI";
import CaloricDemandAPI from "../api/CaloricDemandAPI";
import MealsIngredientsAPI from "../api/MealsIngredientsAPI";
import NewProductInMealForm from "../forms/NewProductInMealForm";
import UseProductForm from "../forms/UseProductForm";
import MealIngredientUpdateForm from "../forms/MealIngredientUpdateForm";
import MealHeading from "./MealHeading";
import SummaryItem from "./SummaryItem";

const BREAKFAST = "Breakfast";
const LUNCH = "Lunch";
const DINNER = "Dinner";
const SNACKS = "Snacks";

const DiaryPage = ({match}) => {
    const [token] = useCookies(['mr-token']);
    const [caloricDemand, setCaloricDemand] = useState("");
    const [mealsI, setMealsI] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeContent, setActiveContent] = useState(null);
    const [activeForm, setActiveForm] = useState("create");

    useEffect(() => {
        DiaryAPI.getDiaryDetails(match.params.id, token['mr-token'])
          .then(response => setMealsI(response.data))
          .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        CaloricDemandAPI.getCaloricDemand(token['mr-token'])
          .then(cd => setCaloricDemand(cd))
          .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        ProductAPI.getProducts(token['mr-token'])   
          .then(response => setProducts(response.data))
          .catch(error => console.log(error))
    }, [mealsI]);

    const handleCreateClick = (values) => {
        const { name, calories, protein, carbohydrates, fat, amount, meal } = values;
        ProductAPI.createProductInMeal({
            product: {
                name,
                calories,
                protein,
                carbohydrates,
                fat
            },
            amount,
            meal,
            diary: match.params.id
        }, token['mr-token'])
          .then(mealI => {
              const newMealsI = [...mealsI, mealI]
              setMealsI(newMealsI)
          })
          .catch(error => console.log(error))         
    };

    const handleUpdateClick = (mealI_id, diary, meal, product, amount) => {
        MealsIngredientsAPI.updateMealIngredient(mealI_id, {diary, meal, product, amount}, token['mr-token'])
          .then(mealI => {
               const newMealsI = mealsI.map(ing => ing.id === mealI.id ? mealI : ing);
               setMealsI(newMealsI);
               setActiveContent(null);
          })
          .catch(error => console.log(error))
    };

    const handleUseClick = (values) => {
        const { meal, product, amount } = values;
        MealsIngredientsAPI.createMealIngredient({diary: match.params.id, meal, product, amount}, token['mr-token'])
          .then(mealI => {
              const newMealsI = [...mealsI, mealI]
              setMealsI(newMealsI)
          })
          .catch(error => console.log(error))
    };

    const handleDeleteClick = (ingredient_id) => {
        MealsIngredientsAPI.deleteIngredient(ingredient_id, token['mr-token'])
          .then(() => {
            const newMealsI = mealsI.filter(mealI => mealI.id !== ingredient_id)
            setMealsI(newMealsI)
          })
          .catch(error => console.log(error))
    };

    const handleSwitchClick = (value) => {
        setActiveForm(value);
    };

    const handleContentClick = (value) => {
        setActiveContent(value);
    };

    const breakfastI = mealsI.filter(ing => ing.meal_name === BREAKFAST);
    const lunchI = mealsI.filter(ing => ing.meal_name === LUNCH);
    const dinnerI = mealsI.filter(ing => ing.meal_name === DINNER);
    const snacksI = mealsI.filter(ing => ing.meal_name === SNACKS);

    let totals = {};
    let remaining = {};

    if(mealsI.length && caloricDemand) {
        totals = {
            "calories": mealsI.map(meal => meal.calories).reduce((a, b) => a + b).toFixed(1),
            "protein": mealsI.map(meal => meal.protein).reduce((a, b) => a + b).toFixed(1),
            "carbo": mealsI.map(meal => meal.carbo).reduce((a, b) => a + b).toFixed(1),
            "fat": mealsI.map(meal => meal.fat).reduce((a, b) => a + b).toFixed(1)
        };
        remaining = {
            "calories": (caloricDemand.calories - totals.calories).toFixed(1),
            "protein": (caloricDemand.protein - totals.protein).toFixed(1),
            "carbo": (caloricDemand.carbohydrates - totals.carbo).toFixed(1),
            "fat": (caloricDemand.fat - totals.fat).toFixed(1)
        };
    };

    return (
        <div className="container">
            <div className="main-content">

                <div className="list-heading meal-list-hdg">
                    <span>Name</span>
                    <span>Calories</span>
                    <span>Protein</span>
                    <span>Carbo</span>
                    <span>Fat</span>
                    <span className="meal-actions-heading">Actions</span>
                 </div>

                 {breakfastI.length ?
                    <>
                        <MealHeading text="breakfast" color="#22B9FF" />
                        {breakfastI.map(ing => (
                            <MealsIngredient 
                              key={ing.id}
                              ingredient={ing}
                              switchContent={handleContentClick}
                              switchForm={handleSwitchClick}
                              deleteMealI={handleDeleteClick}
                            />
                        ))}
                    </>
                 : null}

                 {lunchI.length ?
                    <>
                        <MealHeading text="lunch" color="green" />
                        {lunchI.map(ing => (
                            <MealsIngredient 
                              key={ing.id}
                              ingredient={ing}
                              switchContent={handleContentClick}
                              switchForm={handleSwitchClick}
                              deleteMealI={handleDeleteClick}
                            />
                        ))}
                    </>
                 : null}

                 {dinnerI.length ?
                    <>
                        <MealHeading text="dinner" color="orange" />
                        {dinnerI.map(ing => (
                            <MealsIngredient 
                              key={ing.id}
                              ingredient={ing}
                              switchContent={handleContentClick}
                              switchForm={handleSwitchClick}
                              deleteMealI={handleDeleteClick}
                            />
                        ))}
                    </>
                 : null}

                 {snacksI.length ?
                    <>
                        <MealHeading text="snacks" color="red" />
                        {snacksI.map(ing => (
                            <MealsIngredient 
                              key={ing.id}
                              ingredient={ing}
                              switchContent={handleContentClick}
                              switchForm={handleSwitchClick}
                              deleteMealI={handleDeleteClick}
                            />
                        ))}
                    </>
                 : null}
                
                {mealsI.length && caloricDemand ?
                    <div className="summary">
                        <div className="summary-heading">
                            <span>GOALS</span>
                            <span>Calories</span>
                            <span>Protein</span>
                            <span>Carbo</span>
                            <span>Fat</span>
                        </div>
                        <SummaryItem
                          text="Totals"
                          calories={totals.calories}
                          protein={totals.protein}
                          carbo={totals.carbo}
                          fat={totals.fat}
                        />
                        <SummaryItem
                          text="Your Daily Goal"
                          calories={caloricDemand.calories}
                          protein={caloricDemand.protein}
                          carbo={caloricDemand.carbohydrates}
                          fat={caloricDemand.fat}
                        />
                        <SummaryItem
                          text="Remaining"
                          calories={remaining.calories}
                          protein={remaining.protein}
                          carbo={remaining.carbo}
                          fat={remaining.fat}
                        />
                    </div>
                : null}

            </div>

            <div className="form-container">
                {activeForm === "create" ? 
                    <NewProductInMealForm
                      products={products} 
                      switchForm={handleSwitchClick} 
                      createMealIngredient={handleCreateClick}
                    />
                :
                 activeForm === "use" ?
                    <UseProductForm 
                      products={products} 
                      switchForm={handleSwitchClick} 
                      useProduct={handleUseClick} 
                    />
                : 
                 <MealIngredientUpdateForm 
                   mealI={activeContent} 
                   switchForm={handleSwitchClick} 
                   updateMealIngredient={handleUpdateClick} 
                 />}
            </div>

        </div>
    )
};

export default DiaryPage;
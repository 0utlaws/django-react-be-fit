import React from "react";

const MealHeading = ({text, color}) => 
    <h2 className="meal-heading" style={{borderBottom: `2px solid ${color}`}}>{text}</h2>

export default MealHeading;
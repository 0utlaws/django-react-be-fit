import React from "react";

const SummaryItem = ({text, calories, protein, carbo, fat}) =>
        <div className="summary-item">
            <span>{text}</span>
            <span style={{color: calories < 0 ? "red" : null}}>{calories}</span>
            <span style={{color: protein < 0 ? "red" : null}}>{protein}</span>
            <span style={{color: carbo < 0 ? "red" : null}}>{carbo}</span>
            <span style={{color: fat < 0 ? "red" : null}}>{fat}</span>
        </div>

export default SummaryItem;
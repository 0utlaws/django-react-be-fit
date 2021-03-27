import React from "react";

const InfoItem = ({text, value, color}) => 
        <div className="info-item">
            <div className="info-text">
                <h2>{text}</h2>
                <p style={{color: `${color}`}}>{value}</p>
            </div>
        </div>

export default InfoItem;
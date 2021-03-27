import React, { useState, useEffect } from "react";
import "../styles/Panel.css";
import "../styles/Form.css";
import UserForm from "../forms/UserForm";
import InfoItem from "../components/InfoItem";
import CaloricDemandAPI from "../api/CaloricDemandAPI";
import { useCookies } from "react-cookie";


const Panel = () => {

    const [token] = useCookies(['mr-token'])
    const [caloricDemand, setCaloricDemand] = useState("");

    useEffect(() => {
        CaloricDemandAPI.getCaloricDemand(token['mr-token'])
          .then(cd => setCaloricDemand(cd))
          .catch(error => console.log(error))
    }, []);

    const handleUpdateClick = (calories, values) => {
      const { protein, carbohydrates, fat } = values;
      CaloricDemandAPI.updateCaloricDemand({calories, protein, carbohydrates, fat}, token['mr-token'])
        .then(cd => setCaloricDemand(cd))
        .catch(error => console.log(error))
    };

    return (
        <>
            {caloricDemand ?
                <div className="container">
                    <div className="main-content info">
                        <InfoItem 
                          text="Calories"
                          value={caloricDemand.calories}
                          color="#22B9FF"
                        />
                        <InfoItem
                          text="Protein"
                          value={caloricDemand.protein}
                          color="green"
                        />
                        <InfoItem
                          text="Carbohydrates"
                          value={caloricDemand.carbohydrates}
                          color="orange"
                        />
                        <InfoItem
                          text="Fat"
                          value={caloricDemand.fat}
                          color="red"
                        />
                    </div>
                    <div className="form-container">
                        <UserForm 
                          cd={caloricDemand} 
                          updateCd={handleUpdateClick}
                        />
                    </div>
                </div>
            : null}
        </>
    )
};

export default Panel;



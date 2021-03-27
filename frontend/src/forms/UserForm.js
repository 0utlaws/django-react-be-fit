import useInput from "../hooks/useInput";


const UserForm = ({cd, updateCd}) => {

    const [fields, handleFieldChange] = useInput({
        "protein": cd.protein,
        "carbohydrates": cd.carbohydrates,
        "fat": cd.fat
    });

    const updateCaloricDemand = () => {
        const cal = (fields.protein * 4) + (fields.carbohydrates * 4) + (fields.fat * 9)
        updateCd(cal, fields)
    };

    return (
        <div className="form">
            <label>
                Protein
                <input 
                  type="range"
                  name="protein"
                  max={400}
                  value={fields.protein} 
                  onChange={handleFieldChange} 
                />
            </label>
            <span style={{color: "green"}}>{fields.protein}</span>
            <label>
                Carbohydrates
                <input 
                  type="range" 
                  name="carbohydrates"
                  max={600}
                  value={fields.carbohydrates} 
                  onChange={handleFieldChange} 
                />
            </label>
            <span style={{color: "orange"}}>{fields.carbohydrates}</span>
            <label>
                Fat 
                <input 
                  type="range" 
                  name="fat"
                  max={400}
                  value={fields.fat} 
                  onChange={handleFieldChange} 
                />
            </label>
            <span style={{color: "red"}}>{fields.fat}</span>
            <button onClick={updateCaloricDemand}>Update</button>
        </div>
    )
};

export default UserForm;
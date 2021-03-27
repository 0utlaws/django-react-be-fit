import useInput from "../hooks/useInput";

const UseInMealForm = (props) => {

    const [fields, handleFieldChange, setFields] = useInput({
        "meal": "1",
        "diary": props.diarys[0].id,
        "amount": ""
    });

    const useProduct = () => {
        props.useProduct(props.product.id, fields);
        setFields({
            "meal": "1",
            "diary": props.diarys[0].id,
            "amount": ""
        });
    };

    const openCreateForm = () => {
        props.switchContent(null);
        props.switchForm(true);
    };

    return (
        <div className="form">
            <h1>Use {props.product.name}</h1>
            <label>
                Diary
                <select name="diary" value={fields.diary} onChange={handleFieldChange}>
                    {props.diarys.map(diary => <option key={diary.id} value={diary.id}>{diary.date}</option>)}
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
            <button className="addtnl-btn" onClick={openCreateForm}>Creation form</button>
        </div>
    )
};

export default UseInMealForm;
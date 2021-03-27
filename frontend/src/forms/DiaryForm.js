import React,  {useState } from "react";

const DiaryForm = ({createDiary}) => {

    const [date, setDate] = useState("");

    return (
        <div className="form">
            <h1>Create</h1>
            <label>
                Date
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                />
            </label>
            <button onClick={() => createDiary(date)}>Create</button>
        </div>
    )
};

export default DiaryForm;
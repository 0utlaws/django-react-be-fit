import React from "react";
import { Link } from "react-router-dom";

const Diary = ({diary, deleteDiary}) => 
        <div className="diary-item">
            <span>{diary.date}</span>
            <span className="actions">
                <button>
                    <Link to={`/diary/${diary.id}`}>Show</Link>
                </button>
                <button onClick={() => deleteDiary(diary)}>Delete</button>
            </span>
        </div>
           
export default Diary;
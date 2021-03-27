import React, { useState, useEffect } from "react";
import "../styles/DiaryList.css";
import { useCookies } from "react-cookie";
import DiaryAPI from "../api/DiaryAPI";
import Diary from "./Diary";
import DiaryFrom from "../forms/DiaryForm";

const DiaryList = () => {

    const [diarys, setDiarys] = useState([]);
    const [token] = useCookies(['mr-token']);

    useEffect(() => {
        DiaryAPI.getDiarys(token['mr-token'])
          .then(response => setDiarys(response.data))
          .catch(error => console.log(error))
    }, []);

    const handleCreateClick = (date) => {
        DiaryAPI.createDiary({date}, token['mr-token'])
          .then(diary => {
              const newDiarys = [...diarys, diary];
              setDiarys(newDiarys);
          })
          .catch(error => console.log(error))
    };

    const handleDeleteClick = (diary) => {
        DiaryAPI.deleteDiary(diary.id, token['mr-token'])
          .then(() => {
              const newDiarys = diarys.filter(d => d.id !== diary.id)
              setDiarys(newDiarys);
          })
          .catch(error => console.log(error))
    };

    return (
        <div className="container">
            <div className="main-content">
                <div className="list-heading diary-list-hdg">
                    <span>Date</span>
                    <span>Actions</span>
                </div>
                {diarys.length ?
                    <>
                      {diarys.map(diary => <Diary key={diary.id} diary={diary} deleteDiary={handleDeleteClick}/>)}
                    </>
                :
                    <div className="empty-list">
                        <p>No diarys</p>
                    </div>
                }
            </div>
            <div className="form-container">
                <DiaryFrom createDiary={handleCreateClick}/>
            </div>
        </div>
    )
};

export default DiaryList;
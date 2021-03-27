import axios from "axios";

export default class DiaryAPI {

    static getDiaryDetails = (diary_id, token) => {
        return axios.get(`http://127.0.0.1:8000/api/diary/${diary_id}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
    };

    static getDiarys = (token) => {
        return axios.get("http://127.0.0.1:8000/api/diarys/", {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
    };

    static createDiary = (data, token) => {
        return axios.post('http://127.0.0.1:8000/api/diarys/', data, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.data)
    };

    static deleteDiary = (diary_id, token) => {
        return axios.delete(`http://127.0.0.1:8000/api/diary/${diary_id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
    };
};
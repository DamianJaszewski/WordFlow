import http from "../http-common";

const getAll = () =>{
    return http.get("api/Cards");
};

const create = data => {
    http.post("api/Cards", {
        "id": 0,
        "createDate": null,
        "question":  data.question,
        "answer": data.answer,
        "remembered": false,
        "categoryId": data.categoryId,
    });
};

const get = id => {
    return http.get(`api/Cards/${id}`);
};

const getNext = () => {
    return http.get(`api/Cards/Random/`);
};

const update = (data) => {
    return http.put(`/Cards`, {
        "id": data.id,
        "question":  data.question,
        "answer": data.answer,
        "categoryId": data.categoryId,
    });
};

const addRepeatInfo = (id) => {
    return http.put(`api/Cards/Repeat/${id}`);
};

const remove = id => {
return http.delete(`api/Cards/${id}`);
};

const CardsService = {
    getAll,
    get,
    create,
    update,
    remove,
    getNext,
    addRepeatInfo
};

export default CardsService;
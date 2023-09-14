import http from "../http-common";

const getAll = () =>{
    return http.get("/Categories");
};

const create = data => {
    http.post("/Categories", {
        "id": 0,
        "name": data.name
    });
};

const get = id => {
    return http.get(`/Cards/${id}`);
};

const getNext = () => {
    return http.get(`/Cards/Random/`);
};

const update = (id, data) => {
    return http.put(`/Cards/${id}`, data);
};

const addRepeatInfo = (id) => {
    return http.put(`/Cards/Repeat/${id}`);
};

const remove = id => {
return http.delete(`/Cards/${id}`);
};

const CategoryService = {
    getAll,
    create
    // get,
    // create,
    // update,
    // remove,
    // getNext,
    // addRepeatInfo
};

export default CategoryService;
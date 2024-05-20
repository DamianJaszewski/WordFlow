import http from "../http-common";

const getAll = () =>{
    return http.get("api/Categories");
};

const create = data => {
    http.post("api/Categories", {
        "id": 0,
        "name": data.name
    });
};

const get = id => {
    return http.get(`api/Cards/${id}`);
};

const getNext = () => {
    return http.get(`api/Cards/Random/`);
};

const update = (id, data) => {
    return http.put(`api/Cards/${id}`, data);
};

const addRepeatInfo = (id) => {
    return http.put(`api/Cards/Repeat/${id}`);
};

const remove = id => {
return http.delete(`api/Cards/${id}`);
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
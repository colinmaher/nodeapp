// types of action
const Types = {
    CREATE_ITEM: "CREATE_ITEM",
    DELETE_ITEM: "DELETE_ITEM",
    SET_USERNAME: "SET_USERNAME",
    SET_PASSWORD: "SET_PASSWORD"
};
// actions
const createItem = task => ({
    type: Types.CREATE_ITEM,
    payload: task
});

const deleteItem = id => ({
    type: Types.DELETE_ITEM,
    payload: id
});

const setUsername = name => ({
    type: Types.SET_USERNAME,
    payload: name,
});

const setPassword = pwd => ({
    type: Types.SET_PASSWORD,
    payload: pwd
});

export default {
    createItem,
    deleteItem,
    setUsername,
    setPassword,
    Types
};
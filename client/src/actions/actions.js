// types of action
const Types = {
    SET_USER_DATA: "SET_USER_DATA",
    // DELETE_ITEM: "DELETE_ITEM",
};
// actions
const setUserData = userData => ({
    type: Types.CREATE_ITEM,
    userData: userData
});

// const deleteItem = id => ({
//     type: Types.DELETE_ITEM,
//     payload: id
// });


export default {
    setUserData,
    // deleteItem,
    Types
};
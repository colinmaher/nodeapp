// types of action
const Types = {
<<<<<<< HEAD
    CREATE_ITEM: "CREATE_ITEM",
    DELETE_ITEM: "DELETE_ITEM",
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

export default {
    createItem,
    deleteItem,
=======
    SET_USER_DATA: "SET_USER_DATA",
    TWEET: "TWEET",
    DELETE_TWEET: "DELETE_TWEET",
    EDIT_TWEET: "EDIT_TWEET",
};
// actions

// narrow down to reduce network load
const setUserData = userData => ({
    type: Types.SET_USER_DATA,
    payload: userData
});

const tweet = tweet => ({
    type: Types.TWEET,
    payload: tweet
})

const deleteTweet = id => ({
    type: Types.DELETE_TWEET,
    payload: id
})

const editTweet = (tweet) => ({
    type: Types.EDIT_TWEET,
    payload: { tweet }
})

export default {
    setUserData,
    tweet,
    deleteTweet,
    editTweet,
>>>>>>> dev
    Types
}
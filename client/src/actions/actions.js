// types of action
const Types = {
    SET_USER_DATA: "SET_USER_DATA",
    TWEET: "TWEET",
    DELETE_TWEET: "DELETE_TWEET",
};
// actions
const setUserData = userData => ({
    type: Types.SET_USER_DATA,
    payload: userData
});

const tweet = tweet => ({
    type: Types.TWEET,
    payload: tweet
})

const deleteTweet = newTweets => ({
    type: Types.DELETE_TWEET,
    payload: newTweets
})

// const deleteItem = id => ({
//     type: Types.DELETE_ITEM,
//     payload: id
// });


export default {
    setUserData,
    tweet,
    deleteTweet,
    Types
}
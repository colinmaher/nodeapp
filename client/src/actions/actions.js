// types of action
const Types = {
    SET_USER_DATA: "SET_USER_DATA",
    TWEET: "TWEET",
    DELETE_TWEET: "DELETE_TWEET",
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

export default {
    setUserData,
    tweet,
    deleteTweet,
    Types
}
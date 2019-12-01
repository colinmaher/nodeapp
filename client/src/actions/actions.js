// types of action
const Types = {
    SET_USER_DATA: "SET_USER_DATA",
    TWEET: "TWEET",
    DELETE_TWEET: "DELETE_TWEET",
    EDIT_TWEET: "EDIT_TWEET",
    SET_LATEST_TWEETS: "SET_LATEST_TWEETS",
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

const editTweet = tweet => ({
    type: Types.EDIT_TWEET,
    payload: { tweet }
})

const setLatestTweets = latestTweets => ({
    type: Types.SET_LATEST_TWEETS,
    payload: { latestTweets }
})

export default {
    setUserData,
    tweet,
    deleteTweet,
    editTweet,
    setLatestTweets,
    Types
}
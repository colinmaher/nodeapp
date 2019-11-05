import ACTIONS from "../actions/actions"
import _ from "lodash"

const defaultState = {
<<<<<<< HEAD
    items: []
};

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.Types.SET_USER: {
            console.log(action);

            let item = action.payload;
            let newItem = { id: state.items.length + 1, description: item };
            let newState = _.cloneDeep(state);
            newState.items.push(newItem);
            return newState;
        }

        case ACTIONS.Types.DELETE_ITEM: {
            let newState = _.cloneDeep(state);
            let index = _.findIndex(newState.items, { id: action.payload });
            newState.items.splice(index, 1);
            return newState;
=======
    userData: {
        tweets: []
    },
}

const reducer = (state = defaultState, action) => {
    console.log(action)
    // console.log(action.payload)
    switch (action.type) {
        case ACTIONS.Types.SET_USER_DATA: {
            const data = action.payload
            let newState = _.cloneDeep(state)
            newState.userData = data
            return newState
        }
        case ACTIONS.Types.TWEET: {
            const data = action.payload
            let newState = _.cloneDeep(state)
            newState.userData.tweets.push(data)
            return newState
        }
        case ACTIONS.Types.DELETE_TWEET: {
            const id = action.payload
            let newState = _.cloneDeep(state)
            newState.userData.tweets = 
            newState.userData.tweets.filter((tweet) => {
                return tweet._id !== id
            })
            return newState
        }
        case ACTIONS.Types.EDIT_TWEET: {
            const tweet = action.payload.tweet
            let newState = _.cloneDeep(state)
            newState.userData.tweets = 
            newState.userData.tweets.map((t) => {
                console.log(t)
                if (t._id === tweet._id) {
                    console.log(tweet)
                    return tweet
                }
                return t
            })
            return newState
>>>>>>> dev
        }
        default:
            return state
    }
}

<<<<<<< HEAD
export default authReducer;
=======
export default reducer
>>>>>>> dev

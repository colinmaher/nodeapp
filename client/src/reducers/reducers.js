import ACTIONS from "../actions/actions"
import _ from "lodash"

const defaultState = {
    userData: {}
}

const reducer = (state = defaultState, action) => {
    console.log(action)
    console.log(action.payload)
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
        default:
            return state
    }
}

export default reducer
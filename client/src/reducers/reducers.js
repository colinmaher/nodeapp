import ACTIONS from "../actions/actions"
import _ from "lodash"

const defaultState = {
    userData: {}
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.Types.SET_USER_DATA: {
            console.log(action)
            const data = action.payload
            console.log(data)
            let newState = _.cloneDeep(state)
            newState.userData = data
            return newState
        }
        case ACTIONS.Types.TWEET: {
            console.log(action)
            const data = action.payload
            console.log(data)
            let newState = _.cloneDeep(state)
            newState.userData.tweets.push(data)
            return newState
        }
        case ACTIONS.Types.DELETE_TWEET: {
            console.log(action)
            const data = action.payload
            console.log(data)
            let newState = _.cloneDeep(state)
            newState.userData.tweets = data
            return newState
        }
        default:
            return state
    }
}

export default reducer
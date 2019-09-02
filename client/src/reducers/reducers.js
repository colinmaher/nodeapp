import ACTIONS from "../actions/actions";
import _ from "lodash";

const defaultState = {
    userData: {}
};

const userDataReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.Types.SET_USER_DATA: {
            console.log(action);
            const data = action.userData
            let newState = _.cloneDeep(state);
            newState.userData = data;
            return newState;
        }

        default:
            return state;
    }
};

export default userDataReducer;
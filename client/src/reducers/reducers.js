import ACTIONS from "../actions/actions";
import _ from "lodash";

const defaultState = {
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
        }

        default:
            return state;
    }
};

export default authReducer;
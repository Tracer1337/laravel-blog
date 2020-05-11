import { CACHE_DATA } from "../actionTypes.js"

const defaultState = {}

function cache(state = defaultState, action) {
    switch(action.type) {
        case CACHE_DATA:
            return {
                ...state,
                [action.key]: action.data
            }

        default:
            return state
    }
}

export default cache
import { CACHE_DATA, LOCATION_CHANGE } from "../actionTypes.js"

const defaultState = {}

function cache(state = defaultState, action, fullState) {
    switch(action.type) {
        case CACHE_DATA:
            return {
                ...state,
                [action.key]: {
                    data: action.data,
                    lifetime: 0
                }
            }

        case LOCATION_CHANGE:
            for(let key in state) {
                state[key].lifetime++

                if (state[key].lifetime > fullState.settings["cache.lifetimeBeforeDiscarding"]) {
                    delete state[key]
                }
            }
            
            return state

        default:
            return state
    }
}

export default cache
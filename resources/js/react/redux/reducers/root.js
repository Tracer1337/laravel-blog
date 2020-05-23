import auth from "./auth.js"
import cache from "./cache.js"
import settings from "./settings.js"
import serverConfig from "./serverConfig.js"

// Custom implementation of combineReducers
function combineReducers(reducers) {
    const reducerKeys = Object.keys(reducers)

    return function root(state = {}, action) {
        let hasChanged = false
        const nextState = {}
        
        // Feed state through reducers
        for (let key of reducerKeys) {
            const previousStateForKey = state[key]
            const nextStateForKey = reducers[key](previousStateForKey, action, state)
            nextState[key] = nextStateForKey
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey
        }

        hasChanged = hasChanged || reducerKeys.length !== Object.keys(state).length
        
        return hasChanged ? nextState : state
    }
}

const rootReducer = combineReducers({
    auth,
    cache,
    settings,
    serverConfig
})

export default rootReducer
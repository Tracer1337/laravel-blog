import { combineReducers } from "redux"

import auth from "./auth.js"
import cache from "./cache.js"

const rootReducer = combineReducers({
    auth,
    cache
})

export default rootReducer
import { SET_SERVER_CONFIG } from "../actionTypes.js"

const defaultValue = {}

const serverConfig = (state = defaultValue, action) => {
    switch(action.type) {
        case SET_SERVER_CONFIG:
            return action.config

        default:
            return state
    }
}

export default serverConfig
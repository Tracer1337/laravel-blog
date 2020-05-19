import { SET_SETTING, SET_SETTINGS } from "../actionTypes.js"

import Storage from "../../utils/Storage.js"

let defaultState = JSON.parse(Storage.getLocal("settings"))

if(!defaultState) {

    defaultState = {
        "cache.enabled": true,
        "cache.lifetimeBeforeDiscarding": 3,
    }

}

function settings(state = defaultState, action) {
    switch(action.type) {
        case SET_SETTING:
            return {
                ...state,
                [action.key]: action.value
            }

        case SET_SETTINGS:
            for(let key in action.settings) {
                state[key] = action.settings[key]
            }

            return state

        default:
            return state
    }
}

function storedSettings(state, action) {
    state = settings(state, action)

    Storage.setLocal("settings", JSON.stringify(state))

    return state
}

export default storedSettings
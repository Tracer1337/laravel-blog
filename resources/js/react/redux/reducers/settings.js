import { SET_SETTING, SET_SETTINGS } from "../actionTypes.js"

import Storage from "../../utils/Storage.js"

let defaultState = JSON.parse(Storage.getLocal("settings"))

if(!defaultState) {

    defaultState = {
        "cache.enabled": true,
        "cache.lifetimeBeforeDiscarding": 5,
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
            const newState = {...state}
            for(let key in action.settings) {
                newState[key] = action.settings[key]
            }

            return newState

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
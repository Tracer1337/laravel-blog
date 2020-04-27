import { LOGIN, LOGOUT } from "../actionTypes.js"

const defaultState = {
    profile: {},
    isLoggedIn: false
}

function auth(state = defaultState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                profile: action.profile,
                isLoggedIn: true
            }

        case LOGOUT:
            return {
                ...state,
                profile: {},
                isLoggedIn: false
            }

        default:
            return state
    }
}

export default auth
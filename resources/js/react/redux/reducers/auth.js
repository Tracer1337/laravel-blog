import { LOGIN, LOGOUT } from "../actionTypes.js"

const defaultState = {
    user: {},
    isLoggedIn: false
}

function auth(state = defaultState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true
            }

        case LOGOUT:
            return {
                ...state,
                user: {},
                isLoggedIn: false
            }

        default:
            return state
    }
}

export default auth
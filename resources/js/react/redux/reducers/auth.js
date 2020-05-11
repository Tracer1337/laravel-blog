import { LOGIN, LOGOUT, MODIFY_PROFILE } from "../actionTypes.js"

const defaultState = {
    profile: {},
    isLoggedIn: false
}

function auth(state = defaultState, action) {
    if(action.profile?.links && typeof action.profile.links === "string") {
        action.profile.links = JSON.parse(action.profile.links)
    }

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

        case MODIFY_PROFILE:
            const newProfile = state.profile

            for(let key in action.profile) {
                if(newProfile[key]) {
                    newProfile[key] = action.profile[key]
                }
            }

            return {
                ...state,
                profile: newProfile
            }

        default:
            return state
    }
}

export default auth
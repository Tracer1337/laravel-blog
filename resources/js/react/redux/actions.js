import { LOGIN, LOGOUT, MODIFY_PROFILE, CACHE_DATA } from "./actionTypes.js"

export function login(data) {
    return {
        type: LOGIN,
        profile: data.profile,
        token: data.access_token
    }
}

export function logout() {
    return { type: LOGOUT }
}

export function modifyProfile(profile) {
    return {
        type: MODIFY_PROFILE,
        profile
    }
}


export function cacheData(key, data) {
    return {
        type: CACHE_DATA,
        key,
        data
    }
}
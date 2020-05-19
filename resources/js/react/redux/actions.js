import { LOGIN, LOGOUT, MODIFY_PROFILE, CACHE_DATA, SET_SETTING, SET_SETTINGS, LOCATION_CHANGE } from "./actionTypes.js"

export function login(data) {
    return {
        type: LOGIN,
        profile: data.profile,
        token: data.access_token
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
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


export function setSetting(key, value) {
    return {
        type: SET_SETTING,
        key,
        value
    }
}

export function setSettings(settings) {
    return {
        type: SET_SETTINGS,
        settings
    }
}


export function locationChange() {
    return {
        type: LOCATION_CHANGE
    }
}
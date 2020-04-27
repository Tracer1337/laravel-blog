import { LOGIN, LOGOUT } from "./actionTypes.js"

export function login(profile) {
    return {
        type: LOGIN,
        profile
    }
}

export function logout() {
    return { type: LOGOUT }
}
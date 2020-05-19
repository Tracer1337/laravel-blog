class Storage {
    // Cookies
    static getCookie(name) {
        const match = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
        return match?.[2] || 0;
    }

    static setCookie(name, value, days) {
        const date = new Date
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days)
        document.cookie = `${name}=${value};path=/;expires=${date.toGMTString()}`
    }

    static deleteCookie(name) {
        Storage.setCookie(name, "", -1)
    }

    // Local-Storage
    static getLocal(name) {
        return localStorage.getItem(name)
    }

    static setLocal(name, value) {
        localStorage.setItem(name, value)
    }

    static removeLocal(name) {
        localStorage.removeItem(name)
    }
}

export default Storage
import { useState } from "react"

import store from "../redux/store.js"
import { cacheData } from "../redux/actions.js"

function getCachedData(key) {
    const { cache } = store.getState()
    return cache[key]
}

function useCachedData(key) {
    const [data, setData] = useState(getCachedData(key))

    const setCachedData = data => {
        store.dispatch(cacheData(key, data))
        setData(getCachedData(key))
    }

    return [data, setCachedData]
}

export default useCachedData
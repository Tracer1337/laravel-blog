import { useState } from "react"

import store from "../redux/store.js"
import { cacheData } from "../redux/actions.js"

function getCachedData(key) {
    const { cache } = store.getState()

    return cache[key]?.data
}

function useCachedData(key) {
    const updateStore = (data) => store.dispatch(cacheData(key, data))

    const [data, setData] = useState(getCachedData(key))

    const setCachedData = data => {
        updateStore(data)
        setData(getCachedData(key))
    }

    // Reset redirect counter
    updateStore(data)

    return [data, setCachedData]
}

export default useCachedData

export {
    getCachedData
}
import { useState, useEffect } from "react"

import store from "../redux/store.js"
import { cacheData } from "../redux/actions.js"

function getCachedData(key) {
    const { cache } = store.getState()

    return cache[key]?.data
}

function useCachedData(key) {
    const updateStore = (data) => {
        store.dispatch(cacheData(key, data))
    }

    const [data, setData] = useState(getCachedData(key))

    const setCachedData = data => {
        updateStore(data)
        setData(data)
    }

    useEffect(() => {
        // Reset redirect counter and set data to state
        setCachedData(getCachedData(key))
    }, [key])

    return [data, setCachedData]
}

export default useCachedData

export {
    getCachedData
}
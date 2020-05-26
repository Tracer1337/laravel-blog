import { useEffect, useState, useMemo } from "react"

import * as APIMethods from "../config/API.js"
import useCachedData from "./useCachedData.js"

const generateKey = (method, args) => {
    let key = method
    args.forEach(value => key += "." + value)

    return key
}

function useAPIData({
    method,
    args = [],
    cache = true,
    initialLoad = true,
    removeDataBeforeLoading = true
}) {
    // Generate key
    const key = generateKey(method, args)

    // Get (cached) data
    const [data, setData] = cache ? useCachedData(key) : useState()
    
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [lastKey, setLastKey] = useState(key)
    const [isLoading, setIsLoading] = useState(false)

    // Fetch data with provided method & args
    const fetchData = (newArgs) => {
        setIsLoading(true)

        if(removeDataBeforeLoading) {
            setData(null)
        }
        
        return new Promise(async resolve => {
            try {
                const res = await APIMethods[method].apply(null, newArgs || args)
                resolve(res.data)
                setData(res.data)
            } finally {
                setIsLoading(false)
            }
        })
    }

    // Initial load
    useEffect(() => {
        if(((cache && !data) || !cache) && initialLoad && isInitialLoad) {
            fetchData()
        }

        setIsInitialLoad(false)
    }, [method, ...args])

    // Listen to cache changes
    useEffect(() => {
        const hasKeyChanged = key !== lastKey

        if (!isInitialLoad && hasKeyChanged && ((cache && !data) || !cache)) {
            fetchData()
            setLastKey(key)
        }
    }, [data])

    return [data, fetchData, setData, isLoading]
}

export default useAPIData
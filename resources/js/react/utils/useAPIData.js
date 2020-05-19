import { useEffect, useState } from "react"

import * as APIMethods from "../config/API.js"
import useCachedData from "./useCachedData.js"

function useAPIData({
    method,
    args = [],
    cache = true,
    initialLoad = true,
    removeDataBeforeLoading = true
}) {
    // Generate key
    let key = method
    args.forEach(value => key += "." + value)

    // Get (cached) data
    const [data, setData] = cache ? useCachedData(key) : useState()
    
    // Fetch data with provided method & args
    const fetchData = newArgs => {
        if(removeDataBeforeLoading) {
            setData(null)
        }
        
        return new Promise(async resolve => {
            const res = await APIMethods[method].apply(null, newArgs || args)
            resolve(res.data)
            setData(res.data)
        })
    }

    // Initial load
    useEffect(() => {
        if(((cache && !data) || !cache) && initialLoad) {
            fetchData()
        }
    }, [method, ...args])

    return [data, fetchData]
}

export default useAPIData
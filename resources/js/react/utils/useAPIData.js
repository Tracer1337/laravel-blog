import { useEffect, useState } from "react"

import * as APIMethods from "../config/API.js"
import useCachedData from "./useCachedData.js"

function useAPIData(method, args = [], cache = true) {
    let key = method
    args.forEach(value => key += "." + value)
    
    const [data, setData] = cache ? useCachedData(key) : useState()
    
    const fetchData = newArgs => {
        setData(null)
        return new Promise(async resolve => {
            const res = await APIMethods[method].apply(null, newArgs || args)
            resolve(res.data)
            setData(res.data)
        })
    }

    useEffect(() => {
        if((cache && !data) || !cache) {
            fetchData()
        }
    }, [method, ...args])

    return [data, fetchData]
}

export default useAPIData
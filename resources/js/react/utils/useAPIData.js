import { useEffect } from "react"

import * as APIMethods from "../config/API.js"
import useCachedData from "./useCachedData.js"

function useAPIData(method, ...args) {
    const key = `${method}.${args.join(".")}`

    const [data, setCachedData] = useCachedData(key)

    const fetchData = () => {
        return new Promise(async resolve => {
            const res = await APIMethods[method].apply(null, args)
            resolve(res.data)
            setCachedData(res.data)
        })
    }

    useEffect(() => {
        if(!data) {
            fetchData()
        }
    }, [method, ...args])

    return [data, fetchData]
}

export default useAPIData
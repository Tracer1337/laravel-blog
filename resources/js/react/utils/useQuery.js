import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function useQuery(name, isArray) {
    const getParams = () => new URLSearchParams(location.search)

    const location = useLocation()
    const [params, setParams] = useState(getParams())
    
    useEffect(() => {
        const newParams = getParams()
        let hasChanged = false

        // Check if param has changed
        if(isArray) {
            // Do this if necessary
            hasChanged = true
        } else {
            hasChanged = params.get(name) !== newParams.get(name)
        }

        if(hasChanged) {
            setParams(newParams)
        }
    }, [location])

    if(isArray) {
        return params.getAll(name)
    } else {
        return params.get(name)
    }
}

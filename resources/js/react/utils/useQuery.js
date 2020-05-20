import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function useQuery(name, isArray) {
    const getParams = () => new URLSearchParams(location.search)

    const location = useLocation()
    const [params, setParams] = useState(getParams())
    
    useEffect(() => setParams(getParams()), [location])

    if(isArray) {
        return params.getAll(name)
    } else {
        return params.get(name)
    }
}

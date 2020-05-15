import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import ReactGA from "react-ga"

const GATracking = () => {
    const location = useLocation()

    useEffect(() => {
        const page = location.pathname + location.search
        ReactGA.set({ page })
        ReactGA.pageview(page)
    }, [location])

    return null
}

export default GATracking
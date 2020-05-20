import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import ReactGA from "react-ga"

import { GATrackingId } from "../config/constants.js"

const GATracking = ({ settings }) => {
    const [isInitialized, setIsInitialized] = useState(false)
    const location = useLocation()

    useEffect(() => {
        // Require permissions to track user
        if(!settings["cookies.tracking"]) {
            return
        }

        // Initialize Google Analytics
        ReactGA.initialize(GATrackingId, {
            testMode: process.env.NODE_ENV !== "production",
            debug: false
        })

        setIsInitialized(true)
    }, [settings])

    useEffect(() => {
        if(!isInitialized || !settings["cookies.tracking"]) {
            return
        }

        const page = location.pathname + location.search
        ReactGA.set({ page })
        ReactGA.pageview(page)
    }, [location, isInitialized])

    return null
}

const mapStateToProps = store => ({
    settings: store.settings
})

export default connect(mapStateToProps)(GATracking)
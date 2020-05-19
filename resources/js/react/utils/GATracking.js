import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ReactGA from "react-ga"

import Dialog from "../components/Dialog/Dialog.js"

import { GATrackingId } from "../config/constants.js" 
import Storage from "../utils/Storage.js"

const getAccepted = () => Storage.getCookie("ga-accepted")

const GATracking = () => {
    const [isInitialized, setIsInitialized] = useState(false)
    const [trackingAccepted, setTrackingAccepted] = useState(getAccepted())
    const location = useLocation()

    useEffect(() => {
        // Ask for permissions to track user
        if(!trackingAccepted) {
            return
        }

        // Initialize Google Analytics
        ReactGA.initialize(GATrackingId, {
            testMode: process.env.NODE_ENV !== "production",
            debug: false
        })

        setIsInitialized(true)
    }, [trackingAccepted])

    useEffect(() => {
        if(!isInitialized) {
            return
        }

        const page = location.pathname + location.search
        ReactGA.set({ page })
        ReactGA.pageview(page)
    }, [location, isInitialized])

    return React.createElement(Dialog.cookieConsent, {
        onAccept: () => setTrackingAccepted(getAccepted())
    })
}

export default GATracking
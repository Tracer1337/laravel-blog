import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import ReactGA from "react-ga"

import { GATrackingId } from "../config/constants.js"
import store from "../redux/store.js"

// Check if tracking is enabled
const isTrackingEnabled = (customStore) => {
    const { settings } = customStore || store.getState()
    return !!settings["cookies.tracking"]
} 

// Send GA Event
const gaEvent = args => {
    if(isTrackingEnabled()) {
        ReactGA.event(args)
    }
}

// Send GA Modalview
const gaModalview = args => {
    if(isTrackingEnabled()) {
        ReactGA.modalview(args)
    }
}

// Dynamic GA Outbound link
const GAOutboundLink = connect(store => ({ store }))(props => {
    if(isTrackingEnabled(props.store)) {
        return (
            <ReactGA.OutboundLink to={props.to} eventLabel={props.eventLabel} target={props.target}>
                {props.children}
            </ReactGA.OutboundLink>
        )
    }

    return <a href={props.to} target={props.target}>{props.children}</a>
})

const GATracking = ({ isLoading, settings, userId }) => {
    const [isInitialized, setIsInitialized] = useState(false)
    const location = useLocation()

    useEffect(() => {
        // Wait until app is loaded
        if(isLoading) {
            return
        }

        // Require permissions to track user
        if(!settings["cookies.tracking"]) {
            return
        }

        // Initialize Google Analytics
        ReactGA.initialize(GATrackingId, {
            testMode: process.env.NODE_ENV !== "production",
            debug: false,
            gaOptions: {
                userId
            }
        })

        setIsInitialized(true)
    }, [isLoading, settings, userId])

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
    settings: store.settings,
    userId: store.auth.profile?.id
})

export default connect(mapStateToProps)(GATracking)

export {
    gaEvent,
    gaModalview,
    GAOutboundLink
}
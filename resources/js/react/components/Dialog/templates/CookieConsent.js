import React, { useState } from "react"

import Dialog from "../Dialog.js"

import { getCookie, setCookie } from "../../../utils/cookies.js"

const getAccepted = () => getCookie("cookie-consent-accepted")

const CookieConsent = ({ onAccept }) => {
    const [shouldRender, setShouldRender] = useState(!getAccepted())

    if (!shouldRender) {
        return null
    }

    const handleAccept = (shouldAccept = ["tracking"]) => {
        setCookie("cookie-consent-accepted", "true", 365)

        if(shouldAccept.includes("tracking")) {
            setCookie("ga-accepted", "true", 365)
        }

        setShouldRender(false)
        onAccept()
    }

    const handlePreferences = async () => {
        const shouldAccept = await Dialog.cookiePreferences()
        handleAccept(shouldAccept)
    }

    return (
        <div className="card cookie-consent">
            <h3>We use cookies</h3>
            <p>We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from. By browsing our website, you consent to our use of cookies and other tracking technologies.</p>

            <div className="actions">
                <button onClick={() => handleAccept()}>Accept</button>
                <button onClick={handlePreferences}>Change Preferences</button>
            </div>
        </div>
    )
}

export default CookieConsent
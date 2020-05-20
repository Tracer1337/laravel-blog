import React, { useState } from "react"
import { connect } from "react-redux"

import Dialog from "../Dialog.js"

import { setSettings } from "../../../redux/actions.js"

const CookieConsent = ({ settings, setSettings }) => {
    const [shouldRender, setShouldRender] = useState(!settings["cookies.accepted"])

    if (!shouldRender) {
        return null
    }

    const handleAccept = () => {
        setSettings({
            "cookies.accepted": true,
            "cookies.tracking": true
        })
        setShouldRender(false)
    }
    
    return (
        <div className="card cookie-consent">
            <h3>We use cookies</h3>
            <p>We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from. By browsing our website, you consent to our use of cookies and other tracking technologies.</p>

            <div className="actions">
                <button onClick={() => handleAccept()}>Accept</button>
                <button onClick={Dialog.cookiePreferences}>Change Preferences</button>
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
    settings: store.settings
})

export default connect(mapStateToProps, { setSettings })(CookieConsent)
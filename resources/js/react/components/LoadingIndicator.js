import React, { useState, useEffect } from "react"

const LoadingIndicator = ({ center }) => {
    const [showText, setShowText] = useState(false)

    useEffect(() => {
        const id = setTimeout(() => {
            setShowText(true)
        }, 3000)

        return () => clearTimeout(id)
    }, [])

    return (
        <div className={`loader ${center ? "center" : ""}`}>
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
            
            {showText && (
                <div>Send Help</div>
            )}
        </div>
    )
}

export default LoadingIndicator
import React, { useState, useEffect } from "react"

const LoadingIndicator = ({ center, message }) => {
    const [showText, setShowText] = useState(false)

    useEffect(() => {
        const id = setTimeout(() => {
            setShowText(true)
        }, 3000)

        return () => clearTimeout(id)
    }, [])

    return (
        <div className={`loader ${center ? "center" : ""}`}>
            <div className="spinners">
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
            </div>

            <div className="text">
                {message}
                
                {showText && (
                    <>
                        <br/>
                        Send Help
                    </>
                )}
            </div>
        </div>
    )
}

export default LoadingIndicator
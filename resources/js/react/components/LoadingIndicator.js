import React from "react"

const LoadingIndicator = ({ center }) => (
    <div className={`loader ${center ? "center" : ""}`}>
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
    </div>
)

export default LoadingIndicator
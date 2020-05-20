import React from "react"

const ProgressBar = ({ progress }) => (
    <div className="progress-bar">
        <div className="inner-bar" style={{ width: progress * 100 + "%" }}/>
    </div>
)

export default ProgressBar
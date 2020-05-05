import React from "react"

const Fab = ({ onClick, children }) => (
    <div className="fab-wrapper">
        <button className="fab"onClick={onClick}>
            {children}
        </button>
    </div>
)

export default Fab
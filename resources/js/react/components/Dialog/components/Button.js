import React from "react"

function Button({ onClick, value }) {
    return (
        <button onClick={onClick} className="input">
            {value}
        </button>
    )
}

export default Button
import React from "react"

function Button({ onClick, value }) {
    return (
        <button onClick={onClick}>
            {value}
        </button>
    )
}

export default Button
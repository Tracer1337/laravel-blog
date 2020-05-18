import React from "react"

import Icon from "../../Icon.js"

const Error = ({ value }) => {
    return (
        <div className="alert">
            <Icon type="error"/>
            <span>
                {value}
            </span>
        </div>
    )
}

export default Error
import React from "react"

import Icon from "../../Icon.js"

const Success = ({ value }) => {
    return (
        <div className="alert">
            <Icon type="thumb-up-alt"/>
            <span>
                {value}
            </span>
        </div>
    )
}

export default Success
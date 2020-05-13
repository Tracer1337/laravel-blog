import React from "react"
import ThumbUpIcon from "@material-ui/icons/ThumbUpAlt"

const Warning = ({ value }) => {
    return (
        <div className="alert">
            <ThumbUpIcon/>
            <span>
                {value}
            </span>
        </div>
    )
}

export default Warning
import React from "react"
import ErrorIcon from "@material-ui/icons/ErrorOutline"

const Error = ({ value }) => {
    return (
        <div className="alert">
            <ErrorIcon/>
            <span>
                {value}
            </span>
        </div>
    )
}

export default Error
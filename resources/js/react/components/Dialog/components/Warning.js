import React from "react"
import WarningIcon from "@material-ui/icons/WarningOutlined"

const Warning = ({ value }) => {
    return (
        <div className="alert">
            <WarningIcon/>
            <span>
                {value}
            </span>
        </div>
    )
}

export default Warning
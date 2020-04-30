import React, { useMemo } from "react"
import moment from "moment"

const Date = ({ timestamp, className }) => {
    const str = useMemo(() => moment(timestamp).format("DD.MM.YYYY"), [timestamp])
    return (
        <div className={className}>
            {str}
        </div>
    )
}

export default Date
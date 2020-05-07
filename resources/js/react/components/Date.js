import React, { useMemo } from "react"

const Date = ({ timestamp, className }) => {
    const str = useMemo(() => {
        const parts = timestamp.match(/(\d{4})-(\d{1,2})-(\d{1,2})/)
        const day = parts[3]
        const month = parts[2]
        const year = parts[1]
        return `${day}.${month}.${year}`
    }, [timestamp])
    return (
        <div className={className}>
            {str}
        </div>
    )
}

export default Date
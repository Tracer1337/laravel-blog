import React from "react"
import Skeleton from "react-loading-skeleton"

import { GAOutboundLink } from "../../utils/GATracking.js"

const Links = ({ data }) => {
    const links = data.links && JSON.parse(data.links)

    return (
        <div className="links">
            {data.username ? (
                links && Object.entries(links).map(([label, url], i) => (
                    <GAOutboundLink
                        eventLabel={`${data.id} ${label}`}
                        to={url}
                        target="_blank"
                        key={i}
                    >
                        {label}
                    </GAOutboundLink>
                ))
            ) : Array(3).fill().map((_, i) => (
                <Skeleton width={50} height={20} key={i}/>
            ))}
        </div>
    )
}

export default Links
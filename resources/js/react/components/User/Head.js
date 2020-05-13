import React from "react"
import Skeleton from "react-loading-skeleton"

import Avatar from "../Avatar.js"

const Head = ({ data }) => (
    <div className="head">
        <Avatar user={data.user} size={128} showSkeleton={!data.username}/>
        <div className="username">{data.username || <Skeleton width={200}/>}</div>
        <div className="role">{data.role || <Skeleton width={100}/>}</div>
    </div>
)

export default Head
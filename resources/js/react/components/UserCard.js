import React from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import Avatar from "./Avatar.js"

const UserCard = ({ data }) => (
    <Link to={data.id ? `/user/${data.id}` : ""} className="wrapper-link">
        <div className="user-card">
            <Avatar user={data} showSkeleton={!data.full_name} size={48}/>
            <span className="name">{data.full_name || <Skeleton width={200}/>}</span>
        </div>
    </Link>
)

export default UserCard
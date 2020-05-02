import React from "react"

import Avatar from "../Avatar.js"

const Head = ({ data }) => (
    <div className="head">
        <Avatar size={128} />
        <div className="username">{data.username}</div>
        <div className="role">{data.role}</div>
    </div>
)

export default Head
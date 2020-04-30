import React from "react"
import { Link } from "react-router-dom"

import Avatar from "../Avatar.js"
import Date from "../Date.js"

const Head = ({ data }) => (
    <div className="head">
        <Link to={"/user/" + data.user.id} className="user-wrapper">
            <div className="user">
                <Avatar profile={data.user} />
                <span className="username">{data.user.username}</span>
            </div>
        </Link>

        <Date timestamp={data.published_at} className="date" />
    </div>
)

export default Head
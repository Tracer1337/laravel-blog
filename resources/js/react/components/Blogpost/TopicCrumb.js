import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import Icon from "../Icon.js"

const TopicCrumb = ({ data }) => {
    const getContainer = () => document.getElementById("header-portal")

    const [container, setContainer] = useState(getContainer())

    useEffect(() => {
        setContainer(getContainer())
    })

    if(!container) {
        return null
    }

    return ReactDOM.createPortal((
        <Link to={!data ? "" : "/topic/" + data.id} className="wrapper-link topic-crumb-wrapper">
            <div className="topic-crumb">
                <Icon type="arrow-right"/>
                <span className="label">
                    {!data ? <Skeleton width={200} height={35} /> : data.name}
                </span>
            </div>
        </Link>
    ), document.getElementById("header-portal"))
}

export default TopicCrumb
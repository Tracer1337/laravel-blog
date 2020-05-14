import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"
import Skeleton from "react-loading-skeleton"

const TopicCrumb = ({ data }) => ReactDOM.createPortal((
    <Link to={!data ? "" : "/topic/" + data.id} className="wrapper-link">
        <div className="topic-crumb">
            <ArrowRightIcon />
            <span className="label">
                {!data ? <Skeleton width={200} height={35} /> : data.name}
            </span>
        </div>
    </Link>
), document.getElementById("header-portal"))

export default TopicCrumb
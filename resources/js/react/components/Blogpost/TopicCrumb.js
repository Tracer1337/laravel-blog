import React from "react"
import { Link } from "react-router-dom"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"
import Skeleton from "react-loading-skeleton"

const TopicCrumb = ({ data }) => (
    <Link to={!data ? "" : "/topic/" + data.id} className="wrapper-link topic-crumb-wrapper">
        <div className="topic-crumb">
            <ArrowRightIcon />
            <span className="label">
                {!data ? <Skeleton width={200} height={35}/> : data.name}
            </span>
        </div>
    </Link>
)

export default TopicCrumb
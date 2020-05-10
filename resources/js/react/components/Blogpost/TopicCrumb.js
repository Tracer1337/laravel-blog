import React from "react"
import { Link } from "react-router-dom"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"

const TopicCrumb = ({ data, id }) => (
    <Link to={"/topic/" + data.id} className="wrapper-link topic-crumb-wrapper">
        <div className="topic-crumb">
            <ArrowRightIcon />
            <span className="label">
                {data.name}
            </span>
        </div>
    </Link>
)

export default TopicCrumb
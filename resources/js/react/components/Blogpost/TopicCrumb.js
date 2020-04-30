import React from "react"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"

const TopicCrumb = ({ name }) => (
    <div className="topic-crumb">
        <ArrowRightIcon />
        <span className="label">
            {name}
        </span>
    </div>
)

export default TopicCrumb
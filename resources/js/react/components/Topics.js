import React from "react"
import { Link } from "react-router-dom"

const Topics = ({ data }) => (
    <div className="topics">
        {data.map(topic => (
            <Link to={"/topic/" + topic.id} className="chip" key={topic.id}>{topic.name}</Link>
        ))}
    </div>
)

export default Topics
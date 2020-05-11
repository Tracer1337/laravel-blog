import React from "react"
import { Link } from "react-router-dom"

import useAPIData from "../utils/useAPIData.js"

const AllTopics = () => {
    const [data] = useAPIData("getAllTopics")

    if(!data) {
        return <></>
    }

    const topics = data.data

    return (
        <section className="all-topics">
            <h3 className="title">All Topics</h3>

            <div className="topics">
                {topics.map(topic => (
                    <Link to={"/topic/"+topic.id} className="chip" key={topic.id}>{topic.name}</Link>
                ))}
            </div>
        </section>
    )
}

export default AllTopics
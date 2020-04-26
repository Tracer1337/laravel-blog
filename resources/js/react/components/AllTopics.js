import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { getAllTopics } from "../config/API.js"

const AllTopics = () => {
    const [topics, setTopics] = useState()

    useEffect(() => {
        getAllTopics().then(res => setTopics(res.data.data))
    }, [])

    if(!topics) {
        return <></>
    }

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
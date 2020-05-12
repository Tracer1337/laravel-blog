import React from "react"

import Topics from "./Topics.js"
import LoadingIndicator from "./LoadingIndicator.js"

import useAPIData from "../utils/useAPIData.js"

const AllTopics = () => {
    const [data] = useAPIData("getAllTopics")

    if(!data) {
        return <LoadingIndicator/>
    }

    return (
        <section className="all-topics">
            <h3 className="title">All Topics</h3>

            <Topics data={data.data}/>
        </section>
    )
}

export default AllTopics
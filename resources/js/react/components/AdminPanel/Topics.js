import React from "react"

import { Multi } from "./SharedControls.js"

import { getAllTopics, addTopic, deleteTopic } from "../../config/API.js"

const Topics = () => (
    <Multi
        label="Topics"
        methods={{
            getAll: getAllTopics,
            add: addTopic,
            delete: deleteTopic
        }}
    />
)

export default Topics
import React from "react"

import SharedControls from "./SharedControls.js"

const Topics = () => {
    return (
        <SharedControls
            label="Topic"
            generateLink={id => "/topic/" + id}
            withCover
            methods={{
                get: "getAllTopics",
                add: "addTopic",
                edit: "editTopic",
                delete: "deleteTopic"
            }}
        />
    )
}

export default Topics
import React from "react"

import SharedControls from "./SharedControls.js"

const Topics = () => {
    return (
        <SharedControls
            label="Topic"
            generateLink={id => "/topic/" + id}
            methods={{
                get: "getAllTopics",
                add: "addTopic",
                delete: "deleteTopic"
            }}
        />
    )
}

export default Topics
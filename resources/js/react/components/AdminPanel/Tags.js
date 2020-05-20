import React from "react"

import SharedControls from "./SharedControls.js"

const Tags = () => {
    return (
        <SharedControls
            label="Tag"
            generateLink={id => `/tag?tag_ids=${id}`}
            methods={{
                get: "getAllTags",
                add: "addTag",
                delete: "deleteTag"
            }}
        />
    )
}

export default Tags
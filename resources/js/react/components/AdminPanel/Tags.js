import React from "react"

import SharedControls from "./SharedControls.js"

const Tags = () => {
    return (
        <SharedControls
            label="Tag"
            generateLink={id => `/tags?tag_ids=${id}`}
            methods={{
                get: "getAllTags",
                add: "addTag",
                edit: "editTag",
                delete: "deleteTag"
            }}
        />
    )
}

export default Tags
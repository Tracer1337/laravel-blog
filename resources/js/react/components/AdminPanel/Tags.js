import React from "react"

import { Multi } from "./SharedControls.js"

import { getAllTags, addTag, deleteTag } from "../../config/API.js"

const Topics = () => (
    <Multi
        label="Tags"
        methods={{
            getAll: getAllTags,
            add: addTag,
            delete: deleteTag
        }}
    />
)

export default Topics
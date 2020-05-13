import React from "react"

import Tags from "../Tags.js"

const TagsSection = ({ data }) => (
    <div className="blogpost-tags">
        <span>Tags:</span>

        <Tags data={data?.tags}/>
    </div>
)

export default TagsSection
import React from "react"
import Markdown from "react-markdown"

const Biography = ({ data }) => (
    <div className="biography">
        <h3 className="title">Biography</h3>

        {data.content ? (
            <Markdown source={data.content}/>
        ) : (
            <em>No content available</em>
        )}
    </div>
)

export default Biography
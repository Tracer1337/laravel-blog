import React from "react"
import Markdown from "react-markdown"
import Skeleton from "react-loading-skeleton"

const Biography = ({ data }) => (
    <div className="biography">
        <h3 className="title">Biography</h3>

        {data.username ? (
            data.biography ? (
                <Markdown source={data.biography} />
            ) : (
                <em>No content available</em>
            )
        ) : <Skeleton count={5}/>}
    </div>
)

export default Biography
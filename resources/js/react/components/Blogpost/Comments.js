import React from "react"
import Skeleton from "react-loading-skeleton"

import CommentCard from "../CommentCard.js"

const Comments = ({ comments, onAction }) => (
    <div className="comments">
        <h3 className="title">Comments</h3>

        {comments ? comments.map(comment => (
            <CommentCard
                data={comment}
                onAction={onAction}
                key={comment.id}
            />
        )) : <Skeleton count={3} height={100}/>}
    </div>
)

export default Comments
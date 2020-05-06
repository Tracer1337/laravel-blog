import React from "react"

import CommentActions from "./CommentActions.js"
import Date from "../Date.js"

const Comments = ({ comments, onAction }) => {
    return (
        <div className="comments">
            <h3 className="title">Comments</h3>

            {comments.map(comment => (
                <div className="card comment" key={comment.id} data-id={comment.id}>
                    <div className="comment-head">
                        <div className="username">{comment.user.username}</div>
                        <Date timestamp={comment.created_at}/>
                    </div>
                    
                    <div>{comment.content}</div>

                    <CommentActions comment={comment} onAction={onAction}/>
                </div>
            ))}
        </div>
    )
}

export default Comments
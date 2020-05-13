import React from "react"
import Skeleton from "react-loading-skeleton"

import CommentActions from "./CommentActions.js"
import Date from "../Date.js"

const Comments = ({ comments, onAction }) => (
    <div className="comments">
        <h3 className="title">Comments</h3>

        {comments ? comments.map(comment => (
            <div className="card comment" key={comment.id} data-id={comment.id}>
                <div className="comment-head">
                    <div className="username">{comment.user.username}</div>
                    <div className="dates">
                        {comment.created_at !== comment.updated_at && (
                            <div className="edited-hint">Edited: <Date timestamp={comment.updated_at} /></div>
                        )}
                        <Date timestamp={comment.created_at}/>
                    </div>
                </div>
                
                <div>{comment.content}</div>

                <CommentActions comment={comment} onAction={onAction}/>
            </div>
        )) : <Skeleton count={3} height={100}/>}
    </div>
)

export default Comments
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Dialog from "./Dialog/Dialog.js"
import Icon from "./Icon.js"
import Date from "./Date.js"

import { deleteComment } from "../config/API.js"
import { gaEvent } from "../utils/GATracking.js"

const mapStateToProps = store => ({
    profile: store.auth.profile
})

const CommentActions = connect(mapStateToProps)(({ data, profile, onAction }) => {
    if (data.user_id !== profile.id) {
        return null
    }

    const handleDelete = async () => {
        const shouldDelete = await Dialog.verify("The comment will be removed. This action cannot be undone!")
        if (shouldDelete) {
            gaEvent({
                category: "Comment",
                action: "Delete"
            })

            await deleteComment(data.id)
            onAction()
        }
    }

    return (
        <div className="actions">
            <Link to={`/post/${data.blogpost_slug}?commentId=${data.id}&editComment=true`}>
                <Icon type="edit" className="icon" />
            </Link>
            <Icon type="delete" className="icon" onClick={handleDelete} />
        </div>
    )
})

const CommentCard = ({ data, onAction }) => (
    <div className="card comment" data-id={data.id}>
        <div className="comment-head">
            <Link to={"/user/" + data.user.username} className="wrapper-link">
                <div className="username">{data.user.full_name}</div>
            </Link>
            <div className="dates">
                {data.created_at !== data.updated_at && (
                    <div className="edited-hint">Edited: <Date timestamp={data.updated_at} /></div>
                )}
                <Date timestamp={data.created_at} />
            </div>
        </div>

        <div>{data.content}</div>

        <CommentActions data={data} onAction={onAction} />
    </div>
)

export default CommentCard
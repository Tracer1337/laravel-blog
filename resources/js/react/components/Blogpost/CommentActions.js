import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Dialog from "../Dialog/Dialog.js"
import Icon from "../Icon.js"

import { deleteComment } from "../../config/API.js"
import { gaEvent } from "../../utils/GATracking.js"

const CommentActions = ({ comment, profile, onAction }) => {
    if(comment.user_id !== profile.id) {
        return null
    }

    const handleDelete = async () => {
        const shouldDelete = await Dialog.verify("The comment will be removed. This action cannot be undone!")
        if(shouldDelete) {
            gaEvent({
                category: "Comment",
                action: "Delete"
            })
            
            await deleteComment(comment.id)
            onAction()
        }
    }

    return (
        <div className="actions">
            <Link to={`/post/${comment.blogpost_id}?commentId=${comment.id}&editComment=true`}>
                <Icon type="edit" className="icon"/>
            </Link>
            <Icon type="delete" className="icon" onClick={handleDelete}/>
        </div>
    )
}

const mapStateToProps = store => ({
    profile: store.auth.profile
})

export default connect(mapStateToProps)(CommentActions)
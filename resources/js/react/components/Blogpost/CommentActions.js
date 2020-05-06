import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"

import { deleteComment } from "../../config/API.js"
import Dialog from "../Dialog/Dialog.js"

const CommentActions = ({ comment, profile, onAction }) => {
    if(comment.user_id !== profile.id) {
        return null
    }

    const handleDelete = async () => {
        const shouldDelete = await Dialog.verify("The comment will be removed. This action cannot be undone!")
        if(shouldDelete) {
            await deleteComment(comment.id)
            onAction()
        }
    }

    return (
        <div className="actions">
            <Link to={`/blogpost/${comment.blogpost_id}?commentId=${comment.id}&editComment=true`}>
                <EditIcon className="icon"/>
            </Link>
            <DeleteIcon className="icon" onClick={handleDelete}/>
        </div>
    )
}

const mapStateToProps = store => ({
    profile: store.auth.profile
})

export default connect(mapStateToProps)(CommentActions)
import React, { useState } from "react"
import { connect } from "react-redux"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"

import Auth from "../Auth.js"

import { likeBlogpost, addRecommendation, removeRecommendation } from "../../config/API.js"

const Actions = ({ data, onAction, id, profile }) => {
    const [isLoading, setIsLoading] = useState(false)
    const isRecommending = data.recommendations.some(r => r.id = profile.id)

    const throttleRequest = fn => async () => {
        if (!isLoading) {
            setIsLoading(true)
            await fn()
            await onAction()
            setIsLoading(false)
        }
    }

    const handleLike = throttleRequest(likeBlogpost.bind(null, id))

    const handleAddRecommendation = throttleRequest(addRecommendation.bind(null, id))

    const handleRemoveRecommendation = throttleRequest(removeRecommendation.bind(null, id))

    return (
        <div className="actions">
            <div className="action-container" onClick={handleLike}>
                <ThumbUpIcon className="icon" />
                <span className="label">{data.likesCount}</span>
            </div>

            <Auth role="author">
                {isRecommending ? (
                    <div className="action-container" onClick={handleRemoveRecommendation}>
                        <RemoveIcon className="icon" />
                        <span className="label">Remove from Recommendations</span>
                    </div>
                ) : (
                    <div className="action-container" onClick={handleAddRecommendation}>
                        <AddIcon className="icon"/>
                        <span className="label">Add to Recommendations</span>
                    </div>
                )}
            </Auth>
        </div>
    )
}

const mapStateToProps = store => ({
    profile: store.auth.profile
})

export default connect(mapStateToProps)(Actions)
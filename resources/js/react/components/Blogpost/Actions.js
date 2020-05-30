import React, { useState } from "react"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"

import Auth from "../Auth.js"
import Icon from "../Icon.js"

import { likeBlogpost, addRecommendation, removeRecommendation } from "../../config/API.js"
import { gaEvent } from "../../utils/GATracking.js"

const Actions = ({ data, onAction, slug, profile }) => {
    const [isLoading, setIsLoading] = useState(false)
    const isRecommending = data.recommendations?.some(r => r.id = profile.id)

    const sameUser = data.user_id === profile.id

    const throttleRequest = (fn, action) => async () => {
        if (!isLoading) {
            setIsLoading(true)
            
            gaEvent({
                category: "Blogpost",
                action,
                label: slug
            })

            const res = await fn()
            await onAction(res.data)
            setIsLoading(false)
        }
    }

    const handleLike = () => {
        if(!sameUser) {
            throttleRequest(likeBlogpost.bind(null, slug), "Like")()
        }
    }

    const handleAddRecommendation = throttleRequest(addRecommendation.bind(null, slug), "Add to recommendations")

    const handleRemoveRecommendation = throttleRequest(removeRecommendation.bind(null, slug), "Remove from recommendations")

    return (
        <div className="actions">
            {data.user_id ? (
                <div className={`action-container ${sameUser ? "disabled" : ""}`} onClick={handleLike}>
                    <Icon type="thumb-up" className="icon" />
                    <span className="label">{data.likesCount} | From {data.likesDistinctUsers} Users</span>
                </div>
            ) : (
                <>
                    <Skeleton width={100} height={30}/>
                    <br/>
                </>
            )}

            <Auth role="author">
                {data.user_id ? (
                    isRecommending ? (
                        <div className="action-container" onClick={handleRemoveRecommendation}>
                            <Icon type="remove" className="icon" />
                            <span className="label">Remove from Recommendations</span>
                        </div>
                    ) : (
                        <div className="action-container" onClick={handleAddRecommendation}>
                            <Icon type="add" className="icon"/>
                            <span className="label">Add to Recommendations</span>
                        </div>
                    )
                ) : <Skeleton width={100} height={30}/>}
            </Auth>
        </div>
    )
}

const mapStateToProps = store => ({
    profile: store.auth.profile
})

export default connect(mapStateToProps)(Actions)
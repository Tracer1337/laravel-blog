import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import EditIcon from "@material-ui/icons/Edit"
import Skeleton from "react-loading-skeleton"

import Avatar from "../Avatar.js"
import Date from "../Date.js"

const Head = ({ data, profile }) => (
    <>
        <div className="head">
                <Link to={!data.user ? "" : "/user/" + data.user.id} className="user-wrapper">
                    <div className="user">
                        <Avatar user={data.user} showSkeleton={!data.user} />
                        <span className="username">{!data.user ? <Skeleton width={100} /> : data.user.username}</span>
                    </div>
                </Link>

                {!data.published_at ? <Skeleton width={100} /> : (
                    <Date timestamp={data.published_at} className="date" />
                )}
        </div>

        {profile?.id === data.user_id && (
            <Link to={"/create-post?post_id=" + data.id} className="edit-blogpost-link">
                <EditIcon className="icon"/>
                <span>Edit this post</span>
            </Link>
        )}        
    </>
)

const mapStateToProps = store => ({
    profile: store.auth.profile
})

export default connect(mapStateToProps)(Head)
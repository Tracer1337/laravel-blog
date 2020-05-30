import React from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import Date from "./Date.js"
import Avatar from "./Avatar.js"

import { isMobile } from "../config/constants.js"

const BlogpostCard = ({ post, showSkeleton }) => {
    /**
     * Mobile Layout
     */
    if(isMobile) {
        return (
            <div className="blogpost-card">
                <Link to={showSkeleton ? "" : "/user/" + post.user.username} className="wrapper-link">
                    <div className="head">
                        <Avatar user={post?.user} size={24} showSkeleton={showSkeleton}/>
                        {showSkeleton ? <Skeleton width={200}/> : <div className="username">{post?.user.full_name}</div>}
                    </div>
                </Link>

                <Link to={showSkeleton ? "" : "/post/" + post.slug}>
                    <div className="image-wrapper" style={{ backgroundImage: post?.cover?.meta.gradient }}>
                        {showSkeleton && <Skeleton width={350} height={350 * (3 / 4)} />}
                        {post?.cover && !showSkeleton && <img src={post.cover.url} alt="cover" />}
                    </div>
                </Link>

                <Link to={showSkeleton ? "" : "/post/" + post.slug} className="wrapper-link">
                    <div className="body">
                        <div className="title">{showSkeleton ? <Skeleton/> : post.title}</div>
                        <div className="teaser">{showSkeleton ? <Skeleton/> : post.teaser}</div>
                    </div>
                </Link>
            </div>
        )
    }

    /**
     * Desktop Layout
     */
    return (
        <Link to={showSkeleton ? "" : "/post/" + post.slug} className="wrapper-link">
            <div className="blogpost-card">
                <div className="image-wrapper" style={{ backgroundImage: post?.cover?.meta.gradient }}>
                    {showSkeleton && <Skeleton width={350} height={350 * (3 / 4)} />}
                    {post?.cover && !showSkeleton && <img src={post.cover.url} alt="cover" />}
                </div>

                <div className="body">
                    <div className="top">
                        <div className="left author">{showSkeleton ? <Skeleton /> : post.user.full_name}</div>
                        {showSkeleton ? <Skeleton width={100} /> : (
                            <Date timestamp={post.published_at} className="right published-date" />
                        )}
                    </div>

                    <div className="bottom">
                        <div className="left teaser">{showSkeleton ? <Skeleton width={140} height={20} /> : post.teaser}</div>
                        <div className="right topic">{showSkeleton ? <Skeleton width={140} /> : post.topic?.name}</div>
                    </div>

                    <div className="title">{showSkeleton ? <Skeleton width={200} height={20} /> : post.title}</div>
                </div>
            </div>
        </Link>
    )
}

export default BlogpostCard
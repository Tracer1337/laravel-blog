import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import Date from "./Date.js"

const BlogpostCard = ({ post, showSkeleton }) => (
    <Link to={showSkeleton ? "" : "/post/"+post.id} className="blogpost-card-wrapper">
        <div className="blogpost-card">
            <div className="image-wrapper" style={{ backgroundImage: post?.cover?.meta.gradient }}>
                { showSkeleton && <Skeleton width={350} height={350 * (3 / 4)}/> }
                { post?.cover && !showSkeleton && <img src={post.cover.url} alt="cover"/> }
            </div>

            <div className="body">
                <div className="top">
                    <div className="left author">{ showSkeleton ? <Skeleton/> : post.user.full_name }</div>
                    { showSkeleton ? <Skeleton width={100}/> : (
                        <Date timestamp={post.published_at} className="right published-date" />
                    )}
                </div>

                <div className="bottom">
                    <div className="left teaser">{ showSkeleton ? <Skeleton width={140} height={20}/> : post.teaser }</div>
                    <div className="right topic">{ showSkeleton ? <Skeleton width={140}/> : post.topic?.name }</div>
                </div>

                <div className="title">{ showSkeleton ? <Skeleton width={200} height={20}/> : post.title }</div>
            </div>
        </div>
    </Link>
)

export default BlogpostCard
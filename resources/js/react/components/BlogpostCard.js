import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import Date from "./Date.js"

const BlogpostCard = ({ post, showSkeleton }) => {
    const cover = useMemo(() => {
        if(!showSkeleton) {
            return post.assets.find(asset => asset.type === "cover")
        }
    }, [post, showSkeleton])

    const fullName = post?.user?.first_name + " " + post?.user?.last_name

    return (
        <Link to={showSkeleton ? "" : "/blogpost/"+post.id} className="blogpost-card-wrapper">
            <div className="blogpost-card">
                <div className="image-wrapper" style={{ backgroundImage: cover?.meta.gradient }}>
                    { showSkeleton && <Skeleton width={350} height={350 * (3 / 4)}/> }
                    { cover && !showSkeleton && <img src={cover.url} alt="cover"/> }
                </div>

                <div className="body">
                    <div className="top">
                        <div className="left author">{ showSkeleton ? <Skeleton/> : fullName }</div>
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
}

export default BlogpostCard
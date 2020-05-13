import React, { useMemo } from "react"
import { Link } from "react-router-dom"

import Date from "./Date.js"

const BlogpostCard = ({ post }) => {
    const cover = useMemo(() => {
        return post.assets.find(asset => asset.type === "cover")
    }, [post])

    return (
        <Link to={"/blogpost/"+post.id} className="blogpost-card-wrapper">
            <div className="blogpost-card">
                <div className="image-wrapper" style={{ backgroundImage: cover?.meta.gradient }}>
                    {cover && (
                        <img src={cover.url} alt="cover"/>
                    )}
                </div>

                <div className="body">
                    <div className="top">
                        <div className="left author">{post.user?.username}</div>
                        <Date timestamp={post.published_at} className="right published-date"/>
                    </div>

                    <div className="bottom">
                        <div className="left teaser">{post.teaser}</div>
                        <div className="right topic">{post.topic?.name}</div>
                    </div>

                    <div className="title">{post.title}</div>
                </div>
            </div>
        </Link>
    )
}

export default BlogpostCard
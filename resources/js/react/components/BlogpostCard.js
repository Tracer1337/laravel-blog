import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import moment from "moment"

const BlogpostCard = ({ post }) => {
    const publishedDateString = useMemo(() => moment(post.published_at).format("DD.MM.YYYY"), [post])

    return (
        <Link to={"/blogpost/"+post.id} className="blogpost-card-wrapper">
            <div className="blogpost-card">
                <div className="image"/>

                <div className="body">
                    <div className="top">
                        <div className="left author">{post.user.username}</div>
                        <div className="right published-date">{publishedDateString}</div>
                    </div>

                    <div className="bottom">
                        <div className="left teaser">{post.teaser}</div>
                        <div className="right topic">{post.topic.name}</div>
                    </div>

                    <div className="title">{post.title}</div>
                </div>
            </div>
        </Link>
    )
}

export default BlogpostCard
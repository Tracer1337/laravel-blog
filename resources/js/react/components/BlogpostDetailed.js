import React from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import BlogpostCard from "./BlogpostCard.js"
import Date from "./Date.js"

const BlogpostDetailed = ({ post, showSkeleton }) => {
    return (
        <div className="blogpost-detailed">
            <BlogpostCard post={post} showSkeleton={showSkeleton}/>

            <div className="divider"/>

            <table>
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td>{showSkeleton ? <Skeleton/> : post.title}</td>
                    </tr>

                    <tr>
                        <td>Slug</td>
                        <td>{showSkeleton ? <Skeleton/> : post.slug}</td>
                    </tr>

                    <tr>
                        <td>Teaser</td>
                        <td>{showSkeleton ? <Skeleton /> : post.teaser}</td>
                    </tr>

                    <tr>
                        <td>Content Length</td>
                        <td>{showSkeleton ? <Skeleton /> : post.content_length}</td>
                    </tr>

                    <tr>
                        <td>Assets</td>
                        <td>{showSkeleton ? <Skeleton /> : post.assets_count}</td>
                    </tr>

                    <tr>
                        <td>Topic</td>
                        <td>{showSkeleton ? <Skeleton /> : (
                            <Link to={`/topic/${post.topic.id}`}>
                                {post.topic.name}
                            </Link>
                        )}</td>
                    </tr>

                    <tr>
                        <td>Tags</td>
                        <td>{showSkeleton ? <Skeleton /> : post.tags.map(tag => (
                            <Link to={`/topic/${tag.id}`} className="tag" key={tag.id}>
                                {tag.name}
                            </Link>
                        ))}</td>
                    </tr>

                    <tr>
                        <td>Created At</td>
                        <td>{showSkeleton ? <Skeleton /> : <Date timestamp={post.created_at}/>}</td>
                    </tr>

                    <tr>
                        <td>Published At</td>
                        <td>{showSkeleton ? <Skeleton /> : <Date timestamp={post.published_at}/>}</td>
                    </tr>

                    <tr>
                        <td>Last Edit</td>
                        <td>{showSkeleton ? <Skeleton /> : <Date timestamp={post.updated_at}/>}</td>
                    </tr>

                    <tr>
                        <td>Comments</td>
                        <td>{showSkeleton ? <Skeleton /> : post.comments_count}</td>
                    </tr>

                    <tr>
                        <td>Likes</td>
                        <td>{showSkeleton ? <Skeleton /> : `${post.likesCount} | From ${post.likesDistinctUsers} Users`}</td>
                    </tr>

                    <tr>
                        <td>Recommendations</td>
                        <td>{showSkeleton ? <Skeleton /> : post.recommendationsCount}</td>
                    </tr>

                    <tr>
                        <td>Id</td>
                        <td>{showSkeleton ? <Skeleton /> : post.id}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BlogpostDetailed
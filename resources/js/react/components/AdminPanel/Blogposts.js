import React from "react"
import { Link } from "react-router-dom"
import DeleteIcon from "@material-ui/icons/Delete"
import Skeleton from "react-loading-skeleton"

import Dialog from "../Dialog/Dialog.js"
import Date from "../Date.js"
import Pagination from "../Pagination.js"

import { getAllBlogposts, deleteBlogpost } from "../../config/API.js"

const Blogposts = () => {
    const handleRemove = async post => {
        const shouldRemove = await Dialog.verify(`"${post.title}" will be removed`)

        if(shouldRemove) {
            deleteBlogpost(post.id).then(refresh)
        }
    }

    return (
        <Pagination
            fetchMethod={getAllBlogposts}
            renderChildren={({ data }) => {
                const posts = data || Array(20).fill({})

                return (
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>User</th>
                                <th>Topic</th>
                                <th>Published</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {posts.map((post, i) => (
                                <tr key={post.id || i}>
                                    <td>
                                        <Link to={!data ? "" : "/blogpost/" + post.id} className="wrapper-link">
                                            {post.title || <Skeleton width={300}/>}
                                        </Link>
                                    </td>

                                    <td>
                                        <Link to={!data ? "" : "/user/" + post.user_id} className="wrapper-link">
                                            {!data ? <Skeleton width={150}/> : post.user.username}
                                        </Link>
                                    </td>

                                    <td>
                                        <Link to={!data ? "" : "/topic/" + post.topic_id} className="wrapper-link">
                                            {!data ? <Skeleton width={100}/> : post.topic.name}
                                        </Link>
                                    </td>

                                    <td>
                                        {!data ? <Skeleton width={100}/> : <Date timestamp={post.published_at}/>}
                                    </td>

                                    <td>
                                        {!data ? (
                                            <Skeleton circle width={30} height={30}/>
                                        ) : (
                                            <DeleteIcon className="icon" onClick={handleRemove.bind(null, post)}/>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }}
        />
    )
}

export default Blogposts
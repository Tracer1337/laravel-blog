import React from "react"
import { Link } from "react-router-dom"
import DeleteIcon from "@material-ui/icons/Delete"

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
            renderChildren={({ data }) => (
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
                        {data.map(post => (
                            <tr key={post.id}>
                                <td>
                                    <Link to={"/blogpost/" + post.id} className="wrapper-link">
                                        {post.title}
                                    </Link>
                                </td>

                                <td>
                                    <Link to={"/user/" + post.user_id} className="wrapper-link">
                                        {post.user.username}
                                    </Link>
                                </td>

                                <td>
                                    <Link to={"/topic/" + post.topic_id} className="wrapper-link">
                                        {post.topic.name}
                                    </Link>
                                </td>

                                <td>
                                    <Date timestamp={post.published_at} />
                                </td>

                                <td>
                                    <DeleteIcon className="icon" onClick={handleRemove.bind(null, post)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        />
    )
}

export default Blogposts
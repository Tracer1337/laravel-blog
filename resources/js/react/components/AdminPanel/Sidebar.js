import React from "react"
import { Link, useRouteMatch } from "react-router-dom"

const Sidebar = () => {
    const { url } = useRouteMatch()

    return (
        <aside className="sidebar">
            <Link to={url}>
                <h3 className="title">Admin Panel</h3>
            </Link>

            <Link to={`${url}/topics`}>
                <div>Topics</div>
            </Link>

            <Link to={`${url}/tags`}>
                <div>Tags</div>
            </Link>

            <Link to={`${url}/posts`}>
                <div>Posts</div>
            </Link>

            <Link to={`${url}/users`}>
                <div>Users</div>
            </Link>

            <Link to={`${url}/storage`}>
                <div>Storage</div>
            </Link>

            <Link to={`${url}/featured-post`}>
                <div>Featured Post</div>
            </Link>
        </aside>
    )
}

export default Sidebar
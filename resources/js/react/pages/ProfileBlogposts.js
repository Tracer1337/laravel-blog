import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { getProfileBlogposts, deleteBlogpost } from "../config/API.js"

const ProfileBlogpostsPage = () => {
    const [data, setData] = useState(null)

    const fetchData = () => {
        getProfileBlogposts().then(res => setData(res.data))
    }

    const handleDelete = id => {
        deleteBlogpost(id).then(fetchData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if(!data) {
        return (
            <div className="d-flex justify-content-center">
                <div className="border-spinner text-center"/>
            </div>
        )
    }

    const posts = data.data

    return (
        <div className="container my-4">
            {posts.map(post => (
                <div className="card card-body my-2">
                    <h4>{post.title}</h4>
                    <p>Created At: {post.created_at}</p>
                    <p>Published: {(!!post.published_at).toString()}</p>
                    
                    <div className="d-flex">
                        <Link to={"/create-blogpost/"+post.id} className="mr-2">Edit</Link>
                        <Link to={"/blogpost/"+post.id} className="mr-2">View</Link>
                        <button onClick={() => handleDelete(post.id)} className="btn btn-danger mr-2">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProfileBlogpostsPage
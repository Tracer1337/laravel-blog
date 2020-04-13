import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { deleteBlogpost, getBlogposts } from "../config/API.js"

const deletePost = id => {
    return new Promise(resolve => {
        deleteBlogpost(id).then(resolve)
    })
}

const Blogposts = ({ form, profile }) => {
    const [posts, setPosts] = useState()

    const fetchPosts = () => {
        getBlogposts().then(res => {
            console.log(res)
            setPosts(res.data.data)
        })
    }

    const handleEdit = id => {
        form.dispatchEvent(new CustomEvent("edit", { detail: { id } }))
    }

    const handleDelete = id => {
        deletePost(id).then(fetchPosts)
    }

    useEffect(() => {
        form.addEventListener("change", fetchPosts)
        fetchPosts()

        return () => form.removeEventListener("change", fetchPosts)
    }, [])

    if(!posts) {
        return (
            <div className="d-flex justify-content-center my-3">
                <div className="spinner-border text-primary"/>
            </div>
        )
    }

    console.log(posts)
    
    return (
        <div>
            {posts.map(post => (
                    <div className="card card-body my-3" key={post.id}>
                        <div className="d-flex justify-content-between">
                            <Link to={`blogpost/${post.id}`}>
                                <h4>Title: {post.title}</h4>
                            </Link>
                            <p>Topic: {post.topic.name}</p>
                        </div>
                        <p>Teaser: {post.teaser}</p>
                        <p>User: {post.user.username}</p>

                        <label>Tags:</label>
                        <ul>
                            {post.tags.map(tag => (
                                <li key={tag.id}>{tag.name}</li>
                            ))}
                        </ul>

                        {post.user_id === profile.id ? (
                            <div className="row">
                                <div className="col-sm">
                                    <button className="btn btn-secondary w-100" onClick={() => handleEdit(post.id)}>Edit</button>
                                </div>

                                <div className="col-sm">
                                    <button className="btn btn-danger w-100" onClick={() => handleDelete(post.id)}>Delete</button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                )
            )}
        </div>
    )
}

export default Blogposts
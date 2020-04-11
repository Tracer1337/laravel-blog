import React, { useEffect, useState } from "react"

const deletePost = id => {
    return new Promise(resolve => {
        fetch(`api/blogpost/${id}`, {
            method: "DELETE"
        }).then(resolve)
    })
}

const Blogposts = ({ form }) => {
    const [posts, setPosts] = useState()

    const fetchPosts = () => {
        fetch("/api/blogposts").then(res => res.json()).then(res => {
            setPosts(res.data)
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

    return (
        <div>
            {posts.map(post => (
                <div className="card card-body my-3" key={post.id}>
                    <h4>{post.title}</h4>
                    <p>{post.teaser}</p>

                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-secondary w-100" onClick={() => handleEdit(post.id)}>Edit</button>
                        </div>

                        <div className="col-sm">
                            <button className="btn btn-danger w-100" onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Blogposts
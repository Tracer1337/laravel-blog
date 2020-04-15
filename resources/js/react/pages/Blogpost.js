import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import { getBlogpost, addComment, editComment, deleteComment, likeBlogpost, addRecommendation } from "../config/API.js"

const BlogpostPage = ({ profile, isLoggedIn }) => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState("")
    const [editId, setEditId] = useState(null)

    const { id } = useParams()

    const fetchPost = () => {
        getBlogpost(id).then(post => setPost(post.data.data))
    }

    const handleCommentSubmit = event => {
        event.preventDefault()

        const args = {
            content: comment,
            "blogpost_id": id
        }

        if(editId) {
            editComment({
                ...args,
                id: editId
            }).then(fetchPost)
            setComment("")
            setEditId(null)
        } else {
            addComment(args).then(fetchPost)
        }
    }

    const handleEdit = id => {
        setComment(post.comments.find(comment => comment.id === id).content)
        setEditId(id)
    }

    const handleDelete = id => {
        deleteComment(id).then(fetchPost)
    }

    const handleLike = () => {
        likeBlogpost(id).then(fetchPost)
    }

    const handleRecommend = () => {
        addRecommendation(id).then(fetchPost)
    }

    useEffect(() => {
        fetchPost()
    }, [])

    if(!post) {
        return (
            <div className="w-100 d-flex justify-content-center">
                <div className="spinner-border text-primary"/>
            </div>
        )
    }

    return (
        <div className="container my-3">
            <h2 className="text-center">{post.title}</h2>
            <h4>From: <Link to={"/user/"+post.user.id}>{post.user.username}</Link></h4>
            <p>{post.content}</p>
            
            <h4>Likes: {post.likesCount}</h4>
            <h4>Recommendations: {post.recommendationsCount}</h4>

            {isLoggedIn ? (
                <>
                    <button className="btn btn-primary d-block my-2" onClick={handleLike}>Like</button>
                    <button className="btn btn-primary d-block my-2" onClick={handleRecommend}>Recommend this post</button>
                </>
            ) : null}

            <hr className="my-4"/>

            <h4>Comments</h4>

            {post.comments.map(comment => (
                <div className="card card-body my-2" key={comment.id}>
                    <h4>From: {comment.user.username}</h4>
                    <p>{comment.content}</p>

                    {comment.user.id === profile.id ? (
                        <div className="row">
                            <div className="col-sm">
                                <button className="btn btn-secondary w-100" onClick={() => handleEdit(comment.id)}>Edit</button>
                            </div>

                            <div className="col-sm">
                                <button className="btn btn-danger w-100" onClick={() => handleDelete(comment.id)}>Delete</button>
                            </div>
                        </div>
                    ) : null}
                </div>
            ))}

            {isLoggedIn ? (
                <form onSubmit={handleCommentSubmit}>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea name="content" value={comment} onChange={event => setComment(event.target.value)} className="form-control"/>
                    </div>
                    
                    <input type="submit" value="Send" className="form-control"/>
                </form>
            ) : null}
        </div>
    )
}

export default BlogpostPage
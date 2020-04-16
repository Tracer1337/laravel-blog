import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getBlogposts } from "../config/API.js"

const Blogposts = ({ profile }) => {
    const [data, setData] = useState()

    const fetchPosts = (page = 1) => {
        getBlogposts(page).then(res => {
            setData(res.data)
        })
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    if(!data) {
        return (
            <div className="d-flex justify-content-center my-3">
                <div className="spinner-border text-primary"/>
            </div>
        )
    }

    const posts = data.data
    
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
                    <Link to={`user/${post.user.id}`}>User: {post.user.username}</Link>

                    <label>Tags:</label>
                    <ul>
                        {post.tags.map(tag => (
                            <li key={tag.id}>{tag.name}</li>
                        ))}
                    </ul>
                </div>
            ))}

            <nav className="pagination justify-content-center">
                <li className={`page-item ${!data.links.prev ? "disabled" : ""}`} onClick={() => fetchPosts(data.meta.current_page - 1)}>
                    <button className="page-link">Previous</button>
                </li>
                
                {(() => {
                    const pageLinks = []

                    for(let i = 1; i <= data.meta.last_page; i++) {
                        pageLinks[i] = (
                            <li className={`page-item ${i === data.meta.current_page ? "active" : ""}`} onClick={() => fetchPosts(i)} key={i}>
                                <button className="page-link">{i}</button>
                            </li>
                        )
                    }

                    return pageLinks
                })()}

                <li className={`page-item ${!data.links.next ? "disabled" : ""}`} onClick={() => fetchPosts(data.meta.current_page + 1)}>
                    <button className="page-link">Next</button>
                </li>
            </nav>
        </div>
    )
}

export default Blogposts
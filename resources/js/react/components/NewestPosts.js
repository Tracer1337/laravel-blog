import React from "react"

import HorizontalScrollablePosts from "./HorizontalScrollablePosts.js"

import { getNewestPosts } from "../config/API.js"

const NewestPosts = () => (
    <section className="newest-posts">
        <h3 className="title">Newest Posts</h3>
        
        <HorizontalScrollablePosts fetchMethod={getNewestPosts}/>
    </section>
)

export default NewestPosts
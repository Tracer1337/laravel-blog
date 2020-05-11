import React from "react"

import HorizontalScrollablePosts from "./HorizontalScrollablePosts.js"

const NewestPosts = () => (
    <section className="newest-posts">
        <h3 className="title">Newest Posts</h3>
        
        <HorizontalScrollablePosts fetchMethod="getNewestBlogposts"/>
    </section>
)

export default NewestPosts
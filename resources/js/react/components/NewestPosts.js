import React, { useRef } from "react"

import HorizontalScrollablePosts from "./HorizontalScrollablePosts.js"
import Icon from "./Icon.js"

const NewestPosts = () => {
    const postsRef = useRef()

    const handleRefresh = () => {
        postsRef.current.refresh()
    }

    return (
        <section className="newest-posts">
            <h3 className="title with-refresh">
                Newest Posts 
                <Icon type="refresh" className="icon" onClick={handleRefresh}/>
            </h3>
            
            <HorizontalScrollablePosts fetchMethod="getNewestBlogposts" ref={postsRef}/>
        </section>
    )
}

export default NewestPosts
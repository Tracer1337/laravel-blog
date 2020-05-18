import React, { useRef } from "react"
import RefreshIcon from "@material-ui/icons/Sync"

import HorizontalScrollablePosts from "./HorizontalScrollablePosts.js"

const NewestPosts = () => {
    const postsRef = useRef()

    const handleRefresh = () => {
        postsRef.current.refresh()
    }

    return (
        <section className="newest-posts">
            <h3 className="title with-refresh">
                Newest Posts 
                <RefreshIcon className="icon" onClick={handleRefresh}/>
            </h3>
            
            <HorizontalScrollablePosts fetchMethod="getNewestBlogposts" ref={postsRef}/>
        </section>
    )
}

export default NewestPosts
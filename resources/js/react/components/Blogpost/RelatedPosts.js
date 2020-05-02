import React from "react"

import HorizontalScrollablePosts from "../HorizontalScrollablePosts.js"

const RelatedPosts = ({ relations }) => (
    <div className="related-posts">
        <main>
            <h3 className="title">Related Posts</h3>
        </main>

        <HorizontalScrollablePosts posts={relations}/>
    </div>
)

export default RelatedPosts
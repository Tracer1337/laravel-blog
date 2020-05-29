import React from "react"

import HorizontalScrollablePosts from "../components/HorizontalScrollablePosts.js"
import Topics from "../components/Topics.js"
import Tags from "../components/Tags.js"

import useAPIData from "../utils/useAPIData.js"

const Sitemap = () => {
    const [topics] = useAPIData({ method: "getAllTopics" })
    const [tags] = useAPIData({ method: "getAllTags" })
    
    return (
        <div>
            <section>
                <h3 className="title">All Posts</h3>
                <HorizontalScrollablePosts fetchMethod="getAllBlogposts"/>
            </section>

            <div className="spacer"/>

            <section>
                <h3 className="title">All Topics</h3>
                <Topics data={topics?.data}/>
            </section>

            <div className="spacer"/>

            <section>
                <h3 className="title">All Tags</h3>
                <Tags data={tags?.data}/>
            </section>
        </div>
    )
}

export default Sitemap
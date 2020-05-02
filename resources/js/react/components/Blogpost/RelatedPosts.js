import React, { useEffect, useRef } from "react"

import HorizontalScrollablePosts from "../HorizontalScrollablePosts.js"

const RelatedPosts = ({ relations }) => {
    const container = useRef()

    useEffect(() => {
        const align = () => {
            const leftOffset = container.current.getBoundingClientRect().left
            container.current.querySelector(".horizontal-scrollable-posts").style.margin = `0 -${leftOffset}px`
        }

        align()

        window.addEventListener("resize", align)
        return () => window.removeEventListener("resize", align)
    }, [])

    return (
        <div className="related-posts" ref={container}>
            <h3 className="title">Related Posts</h3>

            <HorizontalScrollablePosts posts={relations}/>
        </div>
    )
}

export default RelatedPosts
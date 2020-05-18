import React, { useRef } from "react"

import HorizontalScrollablePosts from "./HorizontalScrollablePosts.js"
import Icon from "./Icon.js"

const Subscriptions = () => {
    const postsRef = useRef()

    const handleRefresh = () => {
        postsRef.current.refresh()
    }

    return (
        <section className="subscriptions">
            <h3 className="title with-refresh">
                Subscriptions
                <Icon type="refresh" className="icon" onClick={handleRefresh}/>
            </h3>

            <HorizontalScrollablePosts fetchMethod="getNewestSubscriptionPosts" ref={postsRef}/>
        </section>
    )
}

export default Subscriptions
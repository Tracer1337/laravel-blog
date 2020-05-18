import React, { useRef } from "react"
import RefreshIcon from "@material-ui/icons/Sync"

import HorizontalScrollablePosts from "./HorizontalScrollablePosts.js"

const Subscriptions = () => {
    const postsRef = useRef()

    const handleRefresh = () => {
        postsRef.current.refresh()
    }

    return (
        <section className="subscriptions">
            <h3 className="title with-refresh">
                Subscriptions
                <RefreshIcon className="icon" onClick={handleRefresh}/>
            </h3>

            <HorizontalScrollablePosts fetchMethod="getNewestSubscriptionPosts" ref={postsRef}/>
        </section>
    )
}

export default Subscriptions
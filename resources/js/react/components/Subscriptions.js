import React from "react"

import { getNewestSubscriptionPosts } from "../config/API.js"
import HorizontalScrollablePosts from "./HorizontalScrollablePosts.js"

const Subscriptions = () => {
    return (
        <section className="subscriptions">
            <h3 className="title">Subscriptions</h3>

            <HorizontalScrollablePosts fetchMethod={getNewestSubscriptionPosts}/>
        </section>
    )
}

export default Subscriptions
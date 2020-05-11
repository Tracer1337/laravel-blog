import React from "react"

import NewestPosts from "../components/NewestPosts.js"
import AllTopics from "../components/AllTopics.js"
import Subscriptions from "../components/Subscriptions.js"
import Auth from "../components/Auth.js"

const Index = () => {
    return (
        <>
            <NewestPosts/>

            <AllTopics/>

            <Auth>
                <Subscriptions/>
            </Auth>
        </>
    )
}

export default Index
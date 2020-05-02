import React from "react"

import NewestPosts from "../components/NewestPosts.js"
import AllTopics from "../components/AllTopics.js"
import Subscriptions from "../components/Subscriptions.js"
import Auth from "../components/Auth.js"

const Index = () => {
    return (
        <>
            <NewestPosts/>

            <div className="spacer"/>

            <AllTopics/>

            <div className="spacer"/>

            <Auth>
                <Subscriptions/>

                <div className="spacer"/>
            </Auth>
        </>
    )
}

export default Index
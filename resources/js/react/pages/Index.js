import React from "react"

import Layout from "../components/Layout/Layout.js"
import NewestPosts from "../components/NewestPosts.js"
import AllTopics from "../components/AllTopics.js"
import Subscriptions from "../components/Subscriptions.js"
import Auth from "../components/Auth.js"

const Index = () => {
    return (
        <Layout>
            <NewestPosts/>

            <div className="spacer"/>

            <AllTopics/>

            <div className="spacer"/>

            <Auth>
                <Subscriptions/>

                <div className="spacer"/>
            </Auth>
        </Layout>
    )
}

export default Index
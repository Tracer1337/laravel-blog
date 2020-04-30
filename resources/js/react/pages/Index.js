import React from "react"

import Layout from "../components/Layout/Layout.js"
import NewestPosts from "../components/NewestPosts.js"
import AllTopics from "../components/AllTopics.js"

const Index = () => {
    return (
        <Layout>
            <NewestPosts/>

            <div className="spacer"/>

            <AllTopics/>

            <div className="spacer"/>
        </Layout>
    )
}

export default Index
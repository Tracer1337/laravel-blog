import React from "react"
import { Helmet } from "react-helmet"

import NewestPosts from "../components/NewestPosts.js"
import AllTopics from "../components/AllTopics.js"
import Subscriptions from "../components/Subscriptions.js"
import Auth from "../components/Auth.js"

import pageTitle from "../config/pageTitle.js"

const Index = () => {
    return (
        <div>
            <Helmet>
                <title>{pageTitle("Index")}</title>
                <meta name="description" content="It is yet another blog"/>
            </Helmet>

            <NewestPosts/>

            <AllTopics/>

            <Auth>
                <Subscriptions/>
            </Auth>
        </div>
    )
}

export default Index
import React from "react"
import { connect } from "react-redux"

import Layout from "../components/Layout/Layout.js"
import NewestPosts from "../components/NewestPosts.js"
import AllTopics from "../components/AllTopics.js"

const Index = ({ isLoggedIn, profile }) => {
    return (
        <Layout>
            <div className="spacer"/>

            <NewestPosts/>

            <div className="spacer"/>

            <AllTopics/>

            <div className="spacer"/>
        </Layout>
    )
}

const mapStateToProps = store => ({
    isLoggedIn: store.auth.isLoggedIn,
    profile: store.auth.profile
})

export default connect(mapStateToProps)(Index)
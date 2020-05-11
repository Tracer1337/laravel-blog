import React from "react"
import { Helmet } from "react-helmet"

import Topics from "../components/AdminPanel/Topics.js"
import Tags from "../components/AdminPanel/Tags.js"
import Blogposts from "../components/AdminPanel/Blogposts.js"
import Users from "../components/AdminPanel/Users.js"

import pageTitle from "../config/pageTitle.js"

const AdminPanel = () => {
    return (
        <div className="admin-panel">
            <Helmet>
                <title>{pageTitle("Admin")}</title>
            </Helmet>

            <main>
                <h3 className="title">Admin Panel</h3>

                <Topics/>

                <Tags/>
                
                <Blogposts/>

                <Users/>
            </main>
        </div>
    )
}

export default AdminPanel
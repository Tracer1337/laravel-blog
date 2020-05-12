import React from "react"
import { Helmet } from "react-helmet"
import { Route, useRouteMatch } from "react-router-dom"

import Sidebar from "../components/AdminPanel/Sidebar.js"
import Topics from "../components/AdminPanel/Topics.js"
import Tags from "../components/AdminPanel/Tags.js"
import Blogposts from "../components/AdminPanel/Blogposts.js"
import Users from "../components/AdminPanel/Users.js"

import pageTitle from "../config/pageTitle.js"

const AdminPanel = () => {
    const { path } = useRouteMatch()

    return (
        <div className="admin-panel">
            <Helmet>
                <title>{pageTitle("Admin")}</title>
            </Helmet>

            <div className="body">
                <Sidebar/>

                <div className="content">
                    <Route path={`${path}/topics`}>
                        <Topics/>
                    </Route>
                    
                    <Route path={`${path}/tags`}>
                        <Tags/>
                    </Route>

                    <Route path={`${path}/posts`}>
                        <Blogposts/>
                    </Route>

                    <Route path={`${path}/users`}>
                        <Users/>
                    </Route>

                    <Route exact path={path}>
                        <div>
                            <h3 className="title">Some Content</h3>
                        </div>
                    </Route>
                </div>
            </div>

        </div>
    )
}

export default AdminPanel
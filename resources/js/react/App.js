import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import Index from "./pages/Index.js"
import Login from "./pages/Login.js"
import Register from "./pages/Register.js"
import Blogpost from "./pages/Blogpost.js"
import User from "./pages/User.js"
import EditProfile from "./pages/EditProfile.js"
import ProfileComments from "./pages/ProfileComments.js"
import CreateBlogpost from "./pages/CreateBlogpost.js"
import ProfileBlogposts from "./pages/ProfileBlogposts.js"
import AdminPanel from "./pages/AdminPanel.js"
import Topic from "./pages/Topic.js"
import Search from "./pages/Search.js"

import Layout from "./components/Layout/Layout.js"

import { login } from "./redux/actions.js"
import { getProfile } from "./config/API.js"

const mapStateToProps = store => ({
    auth: store.auth
})

const ProtectedRoute = connect(mapStateToProps)(({ role, path, children, auth }) => (
    <Route path={path}>
        {!auth.isLoggedIn || (role && auth.profile.role !== role && auth.profile.role !== "admin") ? <Redirect to="/login"/> : children}
    </Route>
))

const App = ({ login }) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getProfile()
            .then(res => login(res.data.data))
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <Router>
            <div className="app">
                <Layout>
                    {isLoading ? (
                        <main className="screen-center">
                            Loading...
                        </main>
                    ) : (
                        <Switch>
                            <ProtectedRoute path="/admin" role="admin">
                                <AdminPanel/>
                            </ProtectedRoute>
                            
                            <ProtectedRoute path="/my-blogposts" role="author">
                                <ProfileBlogposts/>
                            </ProtectedRoute>

                            <ProtectedRoute path="/create-post" role="author">
                                <CreateBlogpost/>
                            </ProtectedRoute>
                            
                            <ProtectedRoute path="/my-comments">
                                <ProfileComments/>
                            </ProtectedRoute>
                            
                            <ProtectedRoute path="/edit-profile">
                                <EditProfile/>
                            </ProtectedRoute>

                            <ProtectedRoute path="/user/:id">
                                <User/>
                            </ProtectedRoute>

                            <Route path="/search">
                                <Search/>
                            </Route>

                            <Route path="/topic/:id">
                                <Topic/>
                            </Route>

                            <Route path="/blogpost/:id">
                                <Blogpost/>
                            </Route>

                            <Route path="/register">
                                <Register/>
                            </Route>

                            <Route path="/login">
                                <Login/>
                            </Route>

                            <Route path="/">
                                <Index/>
                            </Route>
                        </Switch>
                    )}
                </Layout>
            </div>
        </Router>
    )
}

export default connect(null, { login })(App)
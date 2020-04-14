import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Header from "./components/Header.js"

import IndexPage from "./pages/Index.js"
import LoginPage from "./pages/Login.js"
import RegisterPage from "./pages/Register.js"
import BlogpostPage from "./pages/Blogpost.js"
import UserPage from "./pages/User.js"
import EditProfilePage from "./pages/EditProfile.js"

import { getProfile } from "./config/API.js"

const App = () => {
    const [profile, setProfile] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const requestProfile = () => {
        getProfile()
            .then(res => {
                setIsLoggedIn(true)
                setProfile(res.data.data)
                setLoaded(true)
            })
            .catch(() => {
                setIsLoggedIn(false)
                setProfile({})
                setLoaded(true)
            })
    }

    useEffect(() => {
        requestProfile()
    }, [])

    if(!loaded) {
        return (
            <div className="d-flex justify-content-center">
                <div className="border-spinner text-primary"/>
            </div>
        )
    }

    return (
        <Router>
            <Header
                isLoggedIn={isLoggedIn}
                profile={profile}
            />

            <Switch>
                <Route path="/login">
                    <LoginPage/>
                </Route>

                <Route path="/register">
                    <RegisterPage/>
                </Route>

                <Route path="/blogpost/:id">
                    <BlogpostPage profile={profile} isLoggedIn={isLoggedIn}/>
                </Route>

                <Route path="/user/:id">
                    <UserPage profile={profile}/>
                </Route>

                <Route path="/edit-profile">
                    <EditProfilePage profile={profile}/>
                </Route>

                <Route path="/">
                    <IndexPage profile={profile}/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App
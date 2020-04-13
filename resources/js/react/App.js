import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Header from "./components/Header.js"

import IndexPage from "./pages/Index.js"
import LoginPage from "./pages/Login.js"
import RegisterPage from "./pages/Register.js"
import BlogpostPage from "./pages/Blogpost.js"

import { getProfile } from "./config/API.js"

const App = () => {
    const [profile, setProfile] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const requestProfile = () => {
        getProfile()
            .then(res => {
                setIsLoggedIn(true)
                setProfile(res.data)
            })
            .catch(() => {
                setIsLoggedIn(false)
                setProfile({})
            })
    }

    useEffect(() => {
        requestProfile()
    }, [])

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
                    <BlogpostPage profile={profile}/>
                </Route>

                <Route path="/">
                    <IndexPage profile={profile}/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App
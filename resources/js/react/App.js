import React, { useEffect, useState } from "react"
import { connect, useSelector } from "react-redux"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { createMuiTheme, ThemeProvider, CircularProgress } from "@material-ui/core"

import Index from "./pages/Index.js"
import Login from "./pages/Login.js"
import Register from "./pages/Register.js"
import Blogpost from "./pages/Blogpost.js"
import User from "./pages/User.js"

import Layout from "./components/Layout/Layout.js"

import { login } from "./redux/actions.js"
import { getProfile } from "./config/API.js"

const theme = createMuiTheme({
    palette: {
        background: {
            default: "#ffffff"
        }
    }
})

const ProtectedRoute = ({ role, path, children }) => {
    const auth = useSelector(store => store.auth)

    return (
        <Route path={path}>
            {!auth.isLoggedIn || (role && auth.profile.role !== role) ? <Redirect to="/login"/> : children}
        </Route>
    )
}

const App = ({ login }) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getProfile()
            .then(res => login(res.data.data))
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <div className="app">
                    <Layout>
                        {isLoading ? (
                            <main className="screen-center">
                                <CircularProgress/>
                            </main>
                        ) : (
                            <Switch>
                                <Route path="/blogpost/:id">
                                    <Blogpost />
                                </Route>

                                <ProtectedRoute path="/user/:id">
                                    <User />
                                </ProtectedRoute>

                                <Route path="/register">
                                    <Register />
                                </Route>

                                <Route path="/login">
                                    <Login />
                                </Route>

                                <Route path="/">
                                    <Index />
                                </Route>
                            </Switch>
                        )}
                    </Layout>
                </div>
            </ThemeProvider>
        </Router>
    )
}

export default connect(null, { login })(App)
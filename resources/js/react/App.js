import React, { useEffect } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"

import Index from "./pages/Index.js"
import Login from "./pages/Login.js"
import Register from "./pages/Register.js"

import { login } from "./redux/actions.js"
import { getProfile } from "./config/API.js"

const theme = createMuiTheme({
    palette: {
        background: {
            default: "#ffffff"
        }
    }
})

const App = ({ login }) => {
    useEffect(() => {
        getProfile().then(res => login(res.data.data))
    }, [])

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <div className="app">
                    <Switch>
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
                </div>
            </ThemeProvider>
        </Router>
    )
}

export default connect(null, { login })(App)
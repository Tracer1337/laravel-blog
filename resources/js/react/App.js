import React, { useEffect } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core"

import Header from "./components/Header.js"

import Index from "./pages/Index.js"

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
                    <CssBaseline />

                    <Header/>

                    <Switch>
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
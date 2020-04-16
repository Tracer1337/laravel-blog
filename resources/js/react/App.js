import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { CssBaseline } from "@material-ui/core"

import Header from "./components/Header.js"

import Index from "./pages/index.js"

const App = () => {
    return (
        <div className="app">
            <CssBaseline/>
            
            <Header/>

            <Router>
                <Switch>
                    <Route path="/">
                        <Index/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
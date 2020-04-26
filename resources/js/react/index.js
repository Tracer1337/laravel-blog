import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import App from "./App.js"

import store from "./redux/store.js"

import "./assets/scss/main.scss"

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById("root"))
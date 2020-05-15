import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import App from "./App.js"

import store from "./redux/store.js"

import "./assets/scss/main.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Initialize API authentication
const setToken = token => window.axios.defaults.headers.common["Authorization"] = "Bearer " + token
setToken(localStorage.getItem("JWTToken"))

// Refresh token when logged in as new user
let currentValue
store.subscribe(() => {
    const { token, profile } = store.getState().auth
    let previousValue = currentValue
    currentValue = profile.id

    if (previousValue !== currentValue) {
        setToken(token)
    }
})

// Render the App
ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById("root"))
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import App from "./App.js"

import store from "./redux/store.js"

import "./assets/scss/main.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const setToken = () => window.axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("JWTToken")
setToken()

// Refresh token when logged in as new user
const getProfileId = store => store.auth.profile?.id

let currentValue
store.subscribe(() => {
    let previousValue = currentValue
    currentValue = getProfileId(store.getState())

    if (previousValue !== currentValue) {
        setToken()
    }
})


ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById("root"))
import React from "react"
import ReactDOM from "react-dom"

import Dialog from "../Dialog.js"

import { login as loginAction } from "../../../redux/actions.js"
import store from "../../../redux/store.js"
import { login } from "../../../config/API.js"

const Login = ({ onClose }) => {
    const handleSubmit = fields => {
        login(fields)
            .then((profile) => {
                store.dispatch(loginAction(profile))
                onClose()
            }).catch(() => {
                Dialog.error("Login failed")
            })
    }

    return (
        <Dialog
            fields={[
                {
                    type: "title",
                    value: "Login"
                },
                {
                    type: "string",
                    label: "E-Mail",
                    name: "email"
                },
                {
                    type: "string",
                    inputType: "password",
                    label: "Password",
                    name: "password"
                },
                {
                    type: "submit",
                    value: "Submit",
                    inline: true
                },
                {
                    type: "button",
                    value: "Close",
                    onClick: onClose,
                    inline: true
                }
            ]}
            onSubmit={handleSubmit}
        />
    )
}

export default () => {
    const container = document.createElement("div")

    ReactDOM.render(
        <Login onClose={() => ReactDOM.unmountComponentAtNode(container)} />
    , container)
}
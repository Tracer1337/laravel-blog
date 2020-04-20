import React from "react"
import ReactDOM from "react-dom"

import Dialog from "../Dialog.js"

import store from "../../../redux/store.js"
import { login } from "../../../redux/actions.js"
import { register } from "../../../config/API.js"

const Register = ({ onClose }) => {
    const handleSubmit = fields => {
        const formData = new FormData()
        for (let key in fields) {
            formData.append(key, fields[key])
        }

        register(formData)
            .then((res) => {
                store.dispatch(login(res.data.data))
                onClose()
            }).catch(() => {
                Dialog.error("Registration failed")
            })
    }

    return (
        <Dialog
            fields={[
                {
                    type: "title",
                    value: "Register"
                },
                {
                    type: "string",
                    label: "First Name",
                    name: "first_name"
                },
                {
                    type: "string",
                    label: "Last Name",
                    name: "last_name"
                },
                {
                    type: "string",
                    label: "Username",
                    name: "username"
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
                    type: "file",
                    label: "Avatar",
                    name: "avatar",
                    accept: "image/*"
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
        <Register onClose={() => ReactDOM.unmountComponentAtNode(container)}/>
    , container)
}
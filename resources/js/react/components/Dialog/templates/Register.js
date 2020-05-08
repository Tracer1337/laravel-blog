import React from "react"

import Dialog from "../Dialog.js"

const Register = ({ onSubmit }) => (
    <Dialog
        fields={[
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
                type: "submit",
                value: "Submit"
            }
        ]}
        onSubmit={onSubmit}
        fieldsOnly
    />
)

export default Register
import React from "react"

import Dialog from "../Dialog.js"

const Login = ({ onSubmit }) => (
    <Dialog
        fields={[
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

export default Login
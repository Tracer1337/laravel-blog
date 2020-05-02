import React from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"

import { login as loginAction } from "../redux/actions.js"
import { register } from "../config/API.js"
import objectToForm from "../utils/objectToForm.js"

import Layout from "../components/Layout/Layout.js"
import Dialog from "../components/Dialog/Dialog.js"

const Register = ({ loginAction }) => {
    const history = useHistory()

    const handleSubmit = fields => {
        const formData = objectToForm(fields)

        register(formData)
            .then(profile => {
                loginAction(profile)
                history.push("/")
            }).catch(() => {
                Dialog.error("Registration failed")
            })
    }

    return (
        <main className="screen-center">

            <div className="card">
                <h3>Register</h3>

                <form onSubmit={event => event.preventDefault()}>
                    {React.createElement(Dialog.forms.register, {
                        onSubmit: handleSubmit
                    })}
                </form>
            </div>

        </main>
    )
}

export default connect(null, { loginAction })(Register)
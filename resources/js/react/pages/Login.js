import React from "react"
import { connect } from "react-redux"

import { login as loginAction } from "../redux/actions.js"
import { login } from "../config/API.js"

import Layout from "../components/Layout/Layout.js"
import Dialog from "../components/Dialog/Dialog.js"

const Login = ({ loginAction }) => {
    const handleSubmit = fields => {
        login(fields)
            .then((profile) => {
                loginAction(profile)
            }).catch(() => {
                Dialog.error("Login failed")
            })
    }

    return (
        <Layout>
            <main className="screen-center">
                
                <div className="card">
                    <h3>Login</h3>

                    <form onSubmit={event => event.preventDefault()}>
                        {React.createElement(Dialog.forms.login, {
                            onSubmit: handleSubmit
                        })}
                    </form>
                </div>

            </main>
        </Layout>
    )
}

export default connect(null, { loginAction })(Login)
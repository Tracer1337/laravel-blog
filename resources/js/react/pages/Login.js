import React from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"

import Dialog from "../components/Dialog/Dialog.js"

import { login as loginAction } from "../redux/actions.js"
import { login } from "../config/API.js"

const Login = ({ loginAction }) => {
    const history = useHistory()

    const { register, handleSubmit } = useForm()

    const onSubmit = fields => {
        login(fields)
            .then(profile => {
                loginAction(profile)
                history.push("/")
            }).catch(() => {
                Dialog.error("Login failed")
            })
    }

    return (
        <div className="form-page">
            <main>

                <h3 className="title">Login</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>E-Mail</label>
                        <input type="text" name="email" placeholder="E-Mail" className="input" ref={register()}/>
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" className="input" ref={register()}/>
                    </div>

                    <button type="submit">Login</button>
                </form>

            </main> 
        </div>
    )
}

export default connect(null, { loginAction })(Login)
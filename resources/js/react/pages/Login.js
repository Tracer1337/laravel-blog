import React from "react"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"

import Dialog from "../components/Dialog/Dialog.js"

import { login as loginAction } from "../redux/actions.js"
import { login } from "../config/API.js"
import pageTitle from "../config/pageTitle.js"
import { gaEvent } from "../utils/GATracking.js"

const Login = ({ loginAction }) => {
    const history = useHistory()

    const { register, handleSubmit } = useForm({
        defaultValues: {
            remember_me: "true"
        }
    })

    const onSubmit = fields => {
        login(fields)
            .then(data => {
                gaEvent({
                    category: "Auth",
                    action: "Login"
                })
                
                loginAction(data)
                history.push("/")
            }).catch(error => {
                Dialog.error("Login failed", { message: "Wrong credentials" })
            })
    }

    return (
        <div className="form-page">
            <Helmet>
                <title>{pageTitle("Login")}</title>
            </Helmet>
            
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

                    <div className="checkbox">
                        <input type="checkbox" id="remember_me" name="remember_me" ref={register()}/>
                        <label htmlFor="remember_me">Remember Me</label>
                    </div>

                    <button type="submit">Login</button>
                </form>

            </main> 
        </div>
    )
}

export default connect(null, { loginAction })(Login)
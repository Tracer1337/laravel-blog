import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"

import Dialog from "../components/Dialog/Dialog.js"
import LoadingIndicator from "../components/LoadingIndicator.js"

import { login as loginAction } from "../redux/actions.js"
import { login } from "../config/API.js"
import pageTitle from "../config/pageTitle.js"

const Login = ({ loginAction }) => {
    const history = useHistory()

    const { register, handleSubmit } = useForm()

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = fields => {
        console.log(fields)
        setIsLoading(true)
        login(fields)
            .then(data => {
                loginAction(data)
                history.push("/")
            }).catch(() => {
                Dialog.error("Login failed")
            })
            .finally(() => setIsLoading(false))
    }

    if(isLoading) {
        return <LoadingIndicator center/>
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
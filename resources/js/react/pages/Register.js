import React from "react"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { useForm } from "react-hook-form"

import Dialog from "../components/Dialog/Dialog.js"

import { login as loginAction } from "../redux/actions.js"
import { register as APIRegister } from "../config/API.js"
import pageTitle from "../config/pageTitle.js"

const Register = ({ loginAction }) => {
    const history = useHistory()

    const { register, handleSubmit } = useForm({
        defaultValues: {
            remember_me: "true"
        }
    })

    const onSubmit = fields => {
        if(!fields.accept_terms) {
            return
        }

        APIRegister(fields)
            .then(profile => {
                loginAction(profile)
                history.push("/")
            }).catch(() => {
                Dialog.error("Registration failed")
            })
    }

    return (
        <div className="form-page">
            <Helmet>
                <title>{pageTitle("Register")}</title>
            </Helmet>

            <main>

                <h3 className="title">Register</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>First Name *</label>
                        <input type="text" name="first_name" placeholder="First Name" className="input" ref={register}/>
                    </div>

                    <div>
                        <label>Last Name *</label>
                        <input type="text" name="last_name" placeholder="Last Name" className="input" ref={register}/>
                    </div>

                    <div>
                        <label>Username *</label>
                        <input type="text" name="username" placeholder="Username" className="input" ref={register}/>
                    </div>

                    <div>
                        <label>E-Mail *</label>
                        <input type="text" name="email" placeholder="E-Mail" className="input" ref={register}/>
                    </div>

                    <div>
                        <label>Password *</label>
                        <input type="password" name="password" placeholder="Password" className="input" ref={register}/>
                    </div>

                    <div className="checkbox">
                        <input type="checkbox" id="accept_terms" name="accept_terms" ref={register()} />
                        <label htmlFor="accept_terms">
                            I have read the <Link to="/privacy">Privacy Policy</Link> and agree to our <Link to="/terms-of-service">Terms Of Service</Link> *
                        </label>
                    </div>

                    <div className="checkbox">
                        <input type="checkbox" id="remember_me" name="remember_me" ref={register()} />
                        <label htmlFor="remember_me">Remember Me</label>
                    </div>

                    <p className="em">* Required</p>

                    <button type="submit">Register</button>
                </form>


            </main>
        </div>
    )
}

export default connect(null, { loginAction })(Register)
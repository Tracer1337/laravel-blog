import React, { useState, useRef } from "react"

import { register } from "../config/API.js"

const Register = () => {
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: ""
    })
    const avatarRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()
        
        const avatar = avatarRef.current.files[0]

        const formData = new FormData()
        for(let key in formState) {
            formData.append(key, formState[key])
        }
        formData.append("password_confirmation", formState.password)

        if(avatar) {
            formData.append("avatar", avatar)
        }

        register(formData)
    }

    const handleChange = event => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        })
    }

    return (
        <>
            <div className="my-3">
                <h3>Register</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" value={formState["username"]} onChange={handleChange} className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>E-Mail</label>
                        <input type="email" name="email" value={formState["email"]} onChange={handleChange} className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formState["password"]} onChange={handleChange} className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Avatar</label>
                        <input type="file" name="avatar" className="form-control-file" ref={avatarRef}/>
                    </div>

                    <input type="submit" value="Register" className="btn btn-primary"/>
                </form>
            </div>

            <hr className="my-4" />
        </>
    )
}

export default Register
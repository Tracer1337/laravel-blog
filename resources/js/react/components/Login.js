import React, { useState } from "react"

const Login = () => {
    const [formState, setFormState] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post("api/login", formState)
        .then(() => {
            alert("Logged in")
        }).catch(() => {
            alert("Wrong credentials")
        })
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
                <h3>Login</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>E-Mail</label>
                        <input type="text" name="email" value={formState["email"]} onChange={handleChange} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formState["password"]} onChange={handleChange} className="form-control" />
                    </div>

                    <input type="submit" value="Login" className="btn btn-primary" />
                </form>
            </div>

            <hr className="my-4" />
        </>
    )
}

export default Login
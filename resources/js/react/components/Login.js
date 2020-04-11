import React from "react"

const Login = () => {
    const handleSubmit = () => {
        console.log("Login")
    }

    return (
        <div className="my-3">
            <h3>Login</h3>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="email" name="email" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" />
                </div>
            </form>
        </div>
    )
}

export default Login
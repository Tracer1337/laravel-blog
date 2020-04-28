import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Logo from "../Logo.js"

import { logout } from "../../redux/actions.js"

const Header = ({ isLoggedIn, profile, logout }) => {
    const handleLogout = () => {
        localStorage.removeItem("JWTToken")
        logout()
    }

    return (
        <header className="header">
            <Logo/>

            {
                !isLoggedIn ? (
                    <div className="links">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                ) : (
                    <div className="links">
                        <a href="#" onClick={handleLogout}>Logout</a>

                        <div className="profile">
                            <Link to="/profile">Logged in as: {profile.username}</Link>
                        </div>
                    </div>
                )
            }

        </header>
    )
}

const mapStateToProps = reducers => ({
    isLoggedIn: reducers.auth.isLoggedIn,
    profile: reducers.auth.profile
})

export default connect(mapStateToProps, { logout })(Header)
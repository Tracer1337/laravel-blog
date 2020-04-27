import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Logo from "../Logo.js"

const Header = ({ isLoggedIn, profile }) => {
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
                    <div className="profile">
                        <Link to="/profile">Logged in as: {profile.username}</Link>
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

export default connect(mapStateToProps)(Header)
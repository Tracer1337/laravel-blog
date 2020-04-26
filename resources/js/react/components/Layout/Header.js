import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Toolbar, Typography, Button, Avatar, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Logo from "../Logo.js"
import Dialog from "../Dialog/Dialog.js"

const Header = ({ isLoggedIn, user }) => {
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
                    <></>
                )
            }
        </header>
    )
}

const mapStateToProps = reducers => ({
    isLoggedIn: reducers.auth.isLoggedIn,
    user: reducers.auth.user
})

export default connect(mapStateToProps)(Header)
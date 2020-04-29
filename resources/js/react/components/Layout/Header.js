import React, { useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Logo from "../Logo.js"
import Avatar from "../Avatar.js"
import Menu from "../Menu.js"

import { logout } from "../../redux/actions.js"

const Header = ({ isLoggedIn, profile, logout }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [anchorElement, setAnchorElement] = useState(null)

    const handleLogout = () => {
        localStorage.removeItem("JWTToken")
        logout()
    }

    const toggleMenu = event => {
        if(!menuOpen) {
            setAnchorElement(event.currentTarget)
        }
        setMenuOpen(!menuOpen)
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
                            <Link to="/profile">Logged in as: <strong>{profile.username}</strong></Link>
                            <Avatar onClick={toggleMenu}/>
                        </div>
                    </div>
                )
            }

            {menuOpen && <Menu anchor={anchorElement} />}
        </header>
    )
}

const mapStateToProps = reducers => ({
    isLoggedIn: reducers.auth.isLoggedIn,
    profile: reducers.auth.profile
})

export default connect(mapStateToProps, { logout })(Header)
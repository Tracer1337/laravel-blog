import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Link, useLocation } from "react-router-dom"

import Logo from "../Logo.js"
import Avatar from "../Avatar.js"
import Menu from "./Menu.js"
import SearchBar from "../SearchBar.js"
import Auth from "../Auth.js"

import { logout } from "../../redux/actions.js"
import { isMobile } from "../../config/constants.js"

const Header = ({ isLoggedIn, profile, logout }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [anchorElement, setAnchorElement] = useState(null)
    const location = useLocation()

    const handleLogout = () => {
        localStorage.removeItem("JWTToken")
        logout()
    }

    const openMenu = anchor => {
        setAnchorElement(anchor)
        setMenuOpen(true)
    }

    const closeMenu = () => {
        setAnchorElement(null)
        setMenuOpen(false)
    }

    const toggleMenu = event => {
        if(menuOpen) {
            closeMenu()
        } else {
            openMenu(event.currentTarget)
        }
    }

    useEffect(closeMenu, [location])
    
    const menu = menuOpen && (
        <Auth>
            <Menu anchor={anchorElement}/>
        </Auth>
    )

    if(isMobile) {
        return (
            <header className="header">
                <div className="top">
                    <Logo/>

                    {!isLoggedIn ? (
                        <div className="auth">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    ) : (
                        <div className="profile">
                            <Link to={"/user/" + profile.id}>Logged in as: <strong>{profile.username}</strong></Link>
                            <Avatar onClick={toggleMenu} />
                        </div>
                    )}
                </div>

                <SearchBar/>

                <div id="header-portal"/>

                {menu}

                <hr/>
            </header>
        )
    }

    return (
        <header className="header">
            <div className="left">
                <Logo/>
                <div id="header-portal" />
                <SearchBar/>
            </div>

            {!isLoggedIn ? (
                <div className="auth">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            ) : (
                <div className="auth">
                    <a href="#" onClick={handleLogout}>Logout</a>

                    <div className="profile">
                        <Link to={"/user/" + profile.id}>Logged in as: <strong>{profile.username}</strong></Link>
                        <Avatar onClick={toggleMenu} />
                    </div>
                </div>
            )}

            {menu}
        </header>
    )
}

const mapStateToProps = reducers => ({
    isLoggedIn: reducers.auth.isLoggedIn,
    profile: reducers.auth.profile
})

export default connect(mapStateToProps, { logout })(Header)
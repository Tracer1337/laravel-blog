import React, { useState, useMemo } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Logo from "../Logo.js"
import Avatar from "../Avatar.js"

import { logout } from "../../redux/actions.js"

const Menu = ({ anchor }) => {
    const width = 102

    const position = useMemo(() => {
        const rect = anchor.getBoundingClientRect()
        return { x: rect.x + rect.width - width, y: rect.y + rect.height }
    }, [anchor])

    return (
        <div className="menu" style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>

        </div>
    )
}

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
                            <Link to="/profile">Logged in as: {profile.username}</Link>
                            <Avatar onClick={toggleMenu}/>
                            
                            {menuOpen && <Menu anchor={anchorElement}/>}
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
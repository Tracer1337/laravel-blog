import React, { useState } from "react"
import { Link } from "react-router-dom"

import { logout } from "../config/API.js"

const Header = ({ isLoggedIn, profile }) => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div>
                <Link to="/" className="navbar-brand pr-3" style={{
                    borderRight: "1px solid"
                }}>API Testing</Link>

                {isLoggedIn ? (
                    <img src={profile.avatar_url} className="rounded-circle border border-dark" style={{ height: 40 }}/>
                ) : null}
            </div>

            <button className="navbar-toggler" onClick={toggleNavbar}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`} id="navbarNavDropdown">
                <ul className="navbar-nav mr-auto">
                    {!isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to={"/user/"+profile.id} className="nav-link">
                                    Logged in as: {profile.username}
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/create-blogpost" className="nav-link">
                                    Create Blogpost
                                </Link>
                            </li>

                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={logout}>Logout</a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Header
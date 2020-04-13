import React from "react"
import { Link } from "react-router-dom"

import { logout } from "../config/API.js"

const Header = ({ isLoggedIn, profile }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <Link to="/" className="navbar-brand">API Testing</Link>

            <div className="collapse navbar-collapse">
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
                                <a href="#" className="nav-link">
                                    Logged in as: {profile.username}
                                </a>
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
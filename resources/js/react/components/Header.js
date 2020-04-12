import React from "react"

const Header = ({ onLogin, onRegister, onLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <a href="#" className="navbar-brand">API Testing</a>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={onLogin}>Login</a>
                    </li>
                    
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={onRegister}>Register</a>
                    </li>

                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={onLogout}>Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
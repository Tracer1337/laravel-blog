import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="links">
                <Link to="/legal">Legal Disclosure</Link>
                <Link to="/privacy">Privacy</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </footer>
    )
}

export default Footer
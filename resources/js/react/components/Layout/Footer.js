import React from "react"
import { Link } from "react-router-dom"

const Footer = () => (
    <footer className="footer">
        <div className="links">
            <Link to="/legal">Legal Disclosure</Link>
            <Link to="/disclaimer">Disclaimer</Link>
            <Link to="/terms-of-service">Terms Of Service</Link>
            <Link to="/privacy">Privacy</Link>
        </div>
    </footer>
)

export default Footer
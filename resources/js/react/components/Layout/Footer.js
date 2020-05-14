import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
    const handleRedirect = () => {
        window.scrollTo(0, 0)
    }
    
    return (
        <footer className="footer">
            <div className="links">
                <Link to="/legal" onClick={handleRedirect}>Legal Disclosure</Link>
                <Link to="/disclaimer" onClick={handleRedirect}>Disclaimer</Link>
                <Link to="/terms-of-service" onClick={handleRedirect}>Terms Of Service</Link>
                <Link to="/privacy" onClick={handleRedirect}>Privacy</Link>
            </div>
        </footer>
    )
}

export default Footer
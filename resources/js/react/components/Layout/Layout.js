import React from "react"

import Header from "./Header.js"
import Footer from "./Footer.js"

const Layout = ({ children }) => {
    return (
        <>
            <Header/>
                { children }
            <Footer/>
        </>
    )
}

export default Layout
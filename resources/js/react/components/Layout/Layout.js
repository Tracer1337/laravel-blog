import React from "react"

import Header from "./Header.js"
import Footer from "./Footer.js"

const Layout = ({ children, isLoading }) => {
    return (
        <>
            <Header isLoading={isLoading}/>
                { children }
            <Footer/>
        </>
    )
}

export default Layout
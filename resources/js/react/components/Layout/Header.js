import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import Logo from "../Logo.js"
import Avatar from "../Avatar.js"
import Menu from "./Menu.js"
import SearchBar from "../SearchBar.js"
import Auth from "../Auth.js"
import Icon from "../Icon.js"
import Dialog from "../Dialog/Dialog.js"

import { isMobile } from "../../config/constants.js"

const Header = ({ isLoading, isLoggedIn, profile }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [anchorElement, setAnchorElement] = useState(null)
    const location = useLocation()

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

    const handleSettings = () => {
        Dialog.settings()
    }

    useEffect(closeMenu, [location])
    
    const menu = menuOpen && (
        <Auth>
            <Menu anchor={anchorElement}/>
        </Auth>
    )

    const Settings = () => (
        <div className="settings-icon-wrapper">
            <Icon type="settings" className="icon settings" fontSize={32} onClick={handleSettings} />
        </div>
    )

    /**
     * Mobile Layout
     */
    if(isMobile) {
        return (
            <>
                <header className="header">
                    <div className="top">
                        <Logo/>

                        {!isLoggedIn ? (
                            <Settings />
                        ) : (
                            <div className="profile">
                                <Avatar onClick={toggleMenu} />
                                <Settings/>
                            </div>
                        )}
                    </div>

                    {!isLoggedIn && (
                        <div className="auth">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    )}

                    <SearchBar/>

                    <div id="header-portal"/>

                    {menu}
                </header>

                <hr/>
            </>
        )
    }

    /**
     * Desktop Layout
     */
    return (
        <header className="header">
            <div className="left">
                <Logo/>
                <div id="header-portal" />
                <SearchBar/>
            </div>

            <div className="right">
                {isLoading ? (
                    <div className="profile">
                        <Skeleton width={300} height={30} />

                        <div className="avatar">
                            <Skeleton circle width={48} height={48}/>
                        </div>
                    </div>
                ) : (
                    !isLoggedIn ? (
                        <div className="auth">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    ) : (
                        <div className="auth">
                            <div className="profile">
                                <Link to={"/user/" + profile.id}>Logged in as: <strong>{profile.full_name}</strong></Link>
                                <Avatar onClick={toggleMenu} />
                            </div>
                        </div>
                    )
                )}
                    
                <Settings />
            </div>

            {menu}
        </header>
    )
}

const mapStateToProps = reducers => ({
    isLoggedIn: reducers.auth.isLoggedIn,
    profile: reducers.auth.profile
})

export default connect(mapStateToProps)(Header)
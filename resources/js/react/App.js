import React, { useState, useEffect } from "react"

import Header from "./components/Header.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import BlogpostForm from "./components/BlogpostForm.js"
import Blogposts from "./components/Blogposts.js"

const App = () => {
    const [form] = useState(new EventTarget())

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const handleLogin = () => {
        setShowRegister(false)
        setShowLogin(true)
    }

    const handleRegister = () => {
        setShowLogin(false)
        setShowRegister(true)
    }

    const handleLogout = () => {
        axios.post("api/logout")
    }

    useEffect(() => {
        axios.get("api/profile").then(res => {
            console.log(res)
        })
    }, [])

    return (
        <div>

            <Header
                onLogin={handleLogin}
                onRegister={handleRegister}
                onLogout={handleLogout}
            />
            
            <div className="container">
                {showLogin ? <Login/> : null}
                {showRegister ? <Register/> : null}

                <BlogpostForm form={form} />
                
                <hr className="my-4"/>

                <Blogposts form={form} />
            </div>
        </div>
    )
}

export default App
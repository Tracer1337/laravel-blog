import React from "react"

import Topics from "../components/AdminPanel/Topics.js"
import Tags from "../components/AdminPanel/Tags.js"
import Blogposts from "../components/AdminPanel/Blogposts.js"
import Users from "../components/AdminPanel/Users.js"

const AdminPanel = () => {
    return (
        <div className="admin-panel">
            <main>
                <h3 className="title">Admin Panel</h3>

                <Topics/>

                <Tags/>
                
                <Blogposts/>

                <Users/>
            </main>
        </div>
    )
}

export default AdminPanel
import React from "react"

import Blogposts from "../components/Blogposts.js"

const IndexPage = ({ profile }) => {
    return (
        <div className="container my-4">
            <h4>Newest Blogposts</h4>
            
            <Blogposts profile={profile} />
        </div>
    )
}

export default IndexPage
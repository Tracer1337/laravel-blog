import React, { useState } from "react"

import BlogpostForm from "../components/BlogpostForm.js"
import Blogposts from "../components/Blogposts.js"

const IndexPage = ({ profile }) => {
    const [form] = useState(new EventTarget())

    return (
        <div className="container">
            <BlogpostForm form={form} />

            <hr className="my-4" />

            <Blogposts form={form} profile={profile} />
        </div>
    )
}

export default IndexPage
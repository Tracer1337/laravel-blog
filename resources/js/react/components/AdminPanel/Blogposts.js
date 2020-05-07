import React from "react"

import { Single } from "./SharedControls.js"

import { getAllBlogposts, deleteBlogpost } from "../../config/API.js"

const Blogposts = () => (
    <Single
        label="Posts"
        labelKey="title"
        routePrefix="/blogpost/"
        methods={{
            getAll: getAllBlogposts,
            delete: deleteBlogpost
        }}
    />
)

export default Blogposts
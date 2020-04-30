import React from "react"
import { useParams } from "react-router-dom"

import Layout from "../components/Layout/Layout.js"
import Blogpost from "../components/Blogpost/Blogpost.js"

const BlogpostPage = () => {
    const { id } = useParams()

    return (
        <Layout>
            <Blogpost id={id}/>
        </Layout>
    )
}

export default BlogpostPage

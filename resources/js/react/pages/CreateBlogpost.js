import React from "react"
import { useParams } from "react-router-dom" 

import BlogpostForm from "../components/BlogpostForm.js"

const CreateBlogpostPage = () => {
    const { id } = useParams()

    return (
        <div className="container my-4">
            <BlogpostForm editId={id}/>
        </div>
    )
}

export default CreateBlogpostPage
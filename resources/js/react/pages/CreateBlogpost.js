import React, { useState, useEffect } from "react"

import Form from "../components/CreateBlogpost/Form.js"

import useQuery from "../utils/useQuery.js"
import { getBlogpost } from "../config/API.js"

const CreateBlogpost = () => {
    const post_id = useQuery("post_id")

    const [editData, setEditData] = useState()

    const fetchData = () => {
        getBlogpost(post_id)
            .then(res => setEditData(res.data.data))
    }

    useEffect(() => {
        if (post_id) {
            fetchData()
        } else {
            setEditData(null)
        }
    }, [post_id])

    if(post_id && !editData) {
        return <></>
    }

    return (
        <div className="form-page">
            <main>
                <h3 className="title">Create Post</h3>

                <Form editData={editData} postId={post_id} reload={fetchData}/>
            </main>
        </div>
    )
}

export default CreateBlogpost
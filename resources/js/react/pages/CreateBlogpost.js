import React from "react"

import Form from "../components/CreateBlogpost/Form.js"

import useQuery from "../utils/useQuery.js"
import useAPIData from "../utils/useAPIData.js"

const CreateBlogpost = () => {
    const post_id = useQuery("post_id")

    const [data, reload] = useAPIData("getBlogpost", [post_id])

    if (post_id && !data) {
        return <></>
    }

    const editData = data?.data

    return (
        <div className="form-page">
            <main>
                <h3 className="title">Create Post</h3>

                <Form editData={editData} postId={post_id} reload={reload}/>
            </main>
        </div>
    )
}

export default CreateBlogpost
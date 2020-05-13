import React from "react"
import { Helmet } from "react-helmet"

import Form from "../components/CreateBlogpost/Form.js"
import LoadingIndicator from "../components/LoadingIndicator.js"

import useQuery from "../utils/useQuery.js"
import useAPIData from "../utils/useAPIData.js"
import pageTitle from "../config/pageTitle.js"

const CreateBlogpost = () => {
    const post_id = useQuery("post_id")

    const [data, reload] = useAPIData("getBlogpost", [post_id])

    if (post_id && !data) {
        return <LoadingIndicator center/>
    }

    const editData = data?.data

    return (
        <div className="form-page">
            <Helmet>
                <title>{pageTitle("Create Post")}</title>
            </Helmet>

            <main className="large">
                <h3 className="title">Create Post</h3>

                <Form editData={editData} postId={post_id} reload={reload}/>
            </main>
        </div>
    )
}

export default CreateBlogpost
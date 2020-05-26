import React from "react"
import { useForm } from "react-hook-form"

import FeaturedPostView from "../FeaturedPost.js"
import Dialog from "../Dialog/Dialog.js"
import Icon from "../Icon.js"

import useAPIData from "../../utils/useAPIData.js"
import { createFeaturedPost, removeFeaturedPost } from "../../config/API.js"

const FeaturedPost = () => {
    const { register, getValues } = useForm()

    const [data, reload] = useAPIData({ method: "getFeaturedPost" })

    const handleSubmit = async method => {
        const values = getValues()

        if(method === 0) {
            // Save entry
            createFeaturedPost(values)
                .then(() => {
                    Dialog.success("Saved")
                    reload()
                })
                .catch(() => Dialog.error("Request failed"))

        } else if (method === 1) {
            // Delete entry
            const shouldDelete = await Dialog.verify("The entry will be removed")

            if(shouldDelete) {
                removeFeaturedPost().then(() => {
                    Dialog.success("Removed")
                    reload()
                })
            }
        }
    }

    return (
        <div className="featured-post-panel form-page">
            <h3 className="title">Featured Post</h3>

            <form onSubmit={e => e.preventDefault()}>
                <div>
                    <label htmlFor="blogpost_id">Blogpost Id</label>
                    <input type="text" name="blogpost_id" placeholder="Blogpost Id" defaultValue={data?.blogpost.id} className="input" ref={register()}/>
                </div>

                <div>
                    <label htmlFor="content">Content</label>
                    <textarea name="content" placeholder="Content" defaultValue={data?.content} className="input" ref={register()}/>
                </div>

                <div className="actions">
                    <button type="submit" className="submit" onClick={() => handleSubmit(0)}>
                        <Icon type="save" className="icon"/>
                        <span>Save</span>
                    </button>

                    <button className="submit" onClick={() => handleSubmit(1)}>
                        <Icon type="delete" className="icon"/>
                        <span>Remove Existing</span>
                    </button>
                </div>
            </form>

            {data && (
                <>
                    <h3 className="title">Preview</h3>

                    <div className="card preview">
                        <FeaturedPostView/>
                    </div>
                </>
            )}
        </div>
    )
}

export default FeaturedPost
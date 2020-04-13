import React, { useState, useEffect } from "react"

import { addBlogpost, editBlogpost, getBlogpost, getTopics, getTags } from "../config/API.js"

const defaultFormState = {
    title: "",
    teaser: "",
    content: "",
    topic_id: "",
    tag_ids: []
}

const BlogpostForm = ({ form }) => {
    const [formState, setFormState] = useState(defaultFormState)
    const [topics, setTopics] = useState([])
    const [tags, setTags] = useState([])

    const [editId, setEditId] = useState(null)

    const handleChange = event => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        })
    }

    const handleMultiSelectChange = event => {
        const newValues = []
        for(let option of event.target.options) {
            if(option.selected) {
                newValues.push(option.value)
            }
        }
        setFormState({
            ...formState,
            [event.target.name]: newValues
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        
        const data = {
            ...formState,
            id: editId !== null ? editId : undefined
        }

        ;(editId ? editBlogpost(data) : addBlogpost(data))
        .then(() => {
            setFormState(defaultFormState)
            setEditId(null)
            
            form.dispatchEvent(new CustomEvent("change"))
        })
    }

    const handleEdit = event => {
        const id = event.detail.id

        getBlogpost(id)
            .then(res => {
                const post = res.data.data

                setEditId(id)

                const newFormState = {...defaultFormState}
                for(let key in newFormState) {
                    newFormState[key] = post[key]
                }
                newFormState["tag_ids"] = post.tags.map(tag => tag.id)
                
                setFormState(newFormState)

                window.scrollTo({ top: 0, behavior: "smooth" })
            })
    }

    useEffect(() => {
        form.addEventListener("edit", handleEdit)
        getTopics().then(res => setTopics(res.data.data))
        getTags().then(res => setTags(res.data.data))

        return () => form.removeEventListener("edit", handleEdit)
    }, [])

    return (
        <form onSubmit={handleSubmit} className="my-3">
            
            <h3>
                {editId !== null ? (
                    <> Editing Blogpost {editId} </>
                ) : (
                    <> Add Blogpost </>
                )}
            </h3>

            <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" value={formState["title"]} onChange={handleChange} className="form-control"/>
            </div>

            <div className="form-group">
                <label>Topic</label>
                <select name="topic_id" value={formState["topic_id"]} onChange={handleChange} className="form-control">
                    {topics.map(topic => (
                        <option value={topic.id} key={topic.id}>{topic.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Teaser</label>
                <textarea name="teaser" value={formState["teaser"]} onChange={handleChange} className="form-control"/>
            </div>

            <div className="form-group">
                <label>Content</label>
                <textarea name="content" value={formState["content"]} onChange={handleChange} className="form-control"/>
            </div>

            <div className="form-group">
                <label>Tags</label>
                <select multiple name="tag_ids" value={formState["tag_ids"]} onChange={handleMultiSelectChange} className="form-control">
                    {tags.map(tag => (
                        <option value={tag.id} key={tag.id}>{tag.name}</option>
                    ))}
                </select>
            </div>

            <input type="submit" value="Save" className="btn btn-primary"/>
        </form>
    )
}

export default BlogpostForm
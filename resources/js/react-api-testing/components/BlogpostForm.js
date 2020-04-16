import React, { useState, useEffect } from "react"
import ReactDOMServer from "react-dom/server"
import { useHistory, useLocation } from "react-router-dom"
import MarkdownEditor from "react-simplemde-editor"
import Markdown from "react-markdown"
import "easymde/dist/easymde.min.css"

import { addBlogpost, editBlogpost, getBlogpost, getTopics, getTags } from "../config/API.js"

const markdownEditorId = "blogpost_markdown_editor"

const defaultFormState = {
    title: "",
    teaser: "",
    content: "",
    topic_id: "",
    tag_ids: []
}

const BlogpostForm = ({ editId }) => {
    const [formState, setFormState] = useState(defaultFormState)
    const [content, setContent] = useState(!editId ? (localStorage.getItem("smde_" + markdownEditorId) || "") : "")
    const [topics, setTopics] = useState([])
    const [tags, setTags] = useState([])

    const [mdeInstance, setMdeInstance] = useState(null)

    const history = useHistory()
    const location = useLocation()

    const handleMdeInstance = instance => {
        setMdeInstance(instance)
    }

    const handleChange = event => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        })
    }

    const handleContentChange = value => {
        setContent(value)
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

    const handleSave = () => handleSubmit(false)
    const handlePublish = () => handleSubmit(true)

    const handleSubmit = publish => {
        const data = {
            ...formState,
            content,
            id: editId !== null ? editId : undefined
        }

        if(publish) {
            data.publish = true
        }

        ;(editId ? editBlogpost(data) : addBlogpost(data))
        .then(() => {
            mdeInstance.clearAutosavedValue()
            history.push("/")
        })
    }

    useEffect(() => {
        getTopics().then(res => setTopics(res.data.data))
        getTags().then(res => setTags(res.data.data))
    }, [])

    useEffect(() => {
        if(editId) {
            getBlogpost(editId)
                .then(res => {
                    const post = res.data.data

                    const newFormState = { ...defaultFormState }
                    for (let key in newFormState) {
                        newFormState[key] = post[key]
                    }
                    newFormState["tag_ids"] = post.tags.map(tag => tag.id)

                    setFormState(newFormState)
                    setContent(newFormState["content"])
                })
        } else {
            setFormState(defaultFormState)
        }
    }, [location])

    return (
        <form onSubmit={e => e.preventDefault()} className="my-3">
            
            <h3>
                {editId !== null ? (
                    <> Edit Blogpost </>
                ) : (
                    <> Create Blogpost </>
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
                <MarkdownEditor 
                    value={content} 
                    onChange={handleContentChange}
                    getMdeInstance={handleMdeInstance}
                    options={{
                        autosave: {
                            enabled: !editId,
                            uniqueId: markdownEditorId
                        },

                        previewRender(text) {
                            return ReactDOMServer.renderToString(
                                <Markdown source={text}/>
                            )
                        }
                    }}
                />
            </div>

            <div className="form-group">
                <label>Tags</label>
                <select multiple name="tag_ids" value={formState["tag_ids"]} onChange={handleMultiSelectChange} className="form-control">
                    {tags.map(tag => (
                        <option value={tag.id} key={tag.id}>{tag.name}</option>
                    ))}
                </select>
            </div>

            <input onClick={handleSave} type="submit" value="Save" className="btn btn-primary mr-2"/>
            <input onClick={handlePublish} type="submit" value="Publish" className="btn btn-primary mr-2"/>
        </form>
    )
}

export default BlogpostForm
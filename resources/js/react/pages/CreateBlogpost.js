import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import MarkdownEditor from "react-simplemde-editor"
import SaveIcon from "@material-ui/icons/Save"
import SendIcon from "@material-ui/icons/Send"

import Select from "../components/Select.js"

import { getAllTopics, getAllTags, addBlogpost, editBlogpost, getBlogpost } from "../config/API.js"
import useQuery from "../utils/useQuery.js"

const Filter = ({ source, by, compare, item }) => {
    const filtered = source.filter(object => {
        if(object && by) {
            return compare(object, by)
        }
        return false
    })

    return filtered.length ? (
        <div className="input-search-results">
            {filtered.map((object, i) => React.createElement(item, { object: object, key: i }))}
        </div>
    ) : null
}

const CreateBlogpost = () => {
    const { register, control, watch, getValues, reset } = useForm()

    const [topics, setTopics] = useState()
    const [tags, setTags] = useState()
    const [selectedTags, setSelectedTags] = useState([])
    const [editData, setEditData] = useState()
    
    const post_id = useQuery("post_id")

    const handleTagAdd = tag => {
        if(!selectedTags.some(st => st.id === tag.id)) {
            setSelectedTags([...selectedTags, tag])
        }
    }

    const handleTagRemove = tag => {
        const newSelectedTags = selectedTags.filter(st => st.id !== tag.id)
        setSelectedTags(newSelectedTags)
    }

    const tagFilterCompare = (a, b) => a.name.toLowerCase().startsWith(b.toLowerCase())
    
    const handleSubmit = method => {
        const values = getValues()
        delete values.tag
        values.tags = selectedTags.map(st => st.id)

        if(method === 1) {
            values.publish = true
        }

        if(post_id) {
            values.id = post_id
            editBlogpost(values)
        } else {
            addBlogpost(values)
        }
    }

    useEffect(() => {
        getAllTopics()
            .then(res => setTopics(res.data.data))

        getAllTags()
            .then(res => setTags(res.data.data))
    }, [])

    useEffect(() => {
        if(post_id) {
            getBlogpost(post_id)
                .then(res => {
                    setEditData(res.data.data)
                    setSelectedTags(res.data.data.tags)
                })
        } else {
            setEditData(null)
            reset()
            setSelectedTags([])
        }
    }, [post_id])

    if(!topics || !tags || (post_id && !editData)) {
        return <></>
    }

    return (
        <div className="form-page">
            <main>
                <h3 className="title">Create Post</h3>

                <form onSubmit={e => e.preventDefault()}>
                    <div>
                        <label>Title</label>
                        <input type="text" name="title" placeholder="Title" className="input" defaultValue={editData?.title} ref={register()}/>
                    </div>

                    <div>
                        <label>Topic</label>
                        <Select name="topic_id" ref={register()} defaultValue={editData?.topic_id}>
                            {topics.map(({ name, id }, i) => (
                                <option value={id} key={i}>{name}</option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <label>Teaser</label>
                        <input type="text" name="teaser" placeholder="Teaser" className="input" defaultValue={editData?.teaser} ref={register()} />
                    </div>

                    <div>
                        <label>Content</label>
                        <Controller as={MarkdownEditor} name="content" className="markdown-editor" control={control} defaultValue={editData?.content}/>
                    </div>

                    <div>
                        {selectedTags.length ? (
                            <div className="chips">
                                {selectedTags.map((tag, i) => (
                                    <span className="chip small" onClick={() => handleTagRemove(tag)} key={i}>{tag.name}</span>
                                ))}
                            </div>
                        ) : null}
                        
                        <label>Tags</label>
                        <input type="text" name="tag" placeholder="Tags" className="input" ref={register()}/>

                        <Filter source={tags} by={watch("tag")} compare={tagFilterCompare} item={({ object }) => (
                            <div className="item" onClick={() => handleTagAdd(object)}>
                                {object.name}
                            </div>
                        )}/>
                    </div>

                    <div className="actions">
                        <button className="submit" onClick={() => handleSubmit(0)}>
                            <SaveIcon className="icon"/>
                            <span>Save</span>
                        </button>

                        <button className="submit" onClick={() => handleSubmit(1)}>
                            <SendIcon className="icon"/>
                            <span>Publish</span>
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default CreateBlogpost
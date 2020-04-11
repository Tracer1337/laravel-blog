import React, { useState, useEffect } from "react"

const BlogpostForm = ({ form }) => {
    const [title, setTitle] = useState("")
    const [teaser, setTeaser] = useState("")
    const [content, setContent] = useState("")

    const [editId, setEditId] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch("/api/blogpost", {
            headers: {
                "Content-Type": "application/json"
            },
            method: editId !== null ? "PUT" : "POST",
            body: JSON.stringify({
                title,
                teaser,
                content,
                id: editId !== null ? editId : undefined
            })
        })
        .then(() => {
            setTitle("")
            setTeaser("")
            setContent("")
            setEditId(null)
            
            form.dispatchEvent(new CustomEvent("change"))
        })
    }

    const handleEdit = event => {
        const id = event.detail.id

        fetch(`api/blogpost/${id}`).then(res => res.json()).then(res => {
            const post = res.data

            setEditId(id)

            setTitle(post.title)
            setTeaser(post.teaser)
            setContent(post.content)

            window.scrollTo({ top: 0, behavior: "smooth" })
        })
    }

    useEffect(() => {
        form.addEventListener("edit", handleEdit)

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
                <input type="text" name="title" value={title} onChange={event => setTitle(event.target.value)} className="form-control"/>
            </div>

            <div className="form-group">
                <label>Teaser</label>
                <textarea name="teaser" value={teaser} onChange={event => setTeaser(event.target.value)} className="form-control"/>
            </div>

            <div className="form-group">
                <label>Content</label>
                <textarea name="content" value={content} onChange={event => setContent(event.target.value)} className="form-control"/>
            </div>

            <input type="submit" value="Save" className="btn btn-primary"/>
        </form>
    )
}

export default BlogpostForm
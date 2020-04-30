import React, { useState } from "react"

import { addComment } from "../../config/API.js"

const CommentForm = ({ onSubmit, blogpostId }) => {
    const [content, setContent] = useState("")

    const handleChange = event => {
        setContent(event.target.value)
    }

    const submit = async () => {
        const args = {
            content,
            "blogpost_id": blogpostId
        }
        
        await addComment(args)
        setContent("")
        onSubmit()
    }

    return (
        <div className="comment-form">
            <textarea value={content} onChange={handleChange} placeholder="Leave a comment..."/>
            <button onClick={submit} className="large">Post</button>
        </div>
    )
}

export default CommentForm
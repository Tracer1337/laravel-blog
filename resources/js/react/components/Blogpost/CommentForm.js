import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import { addComment, editComment } from "../../config/API.js"
import { gaEvent } from "../../utils/GATracking.js"

const CommentForm = ({ onSubmit, blogpostSlug, edit, seed, forwardRef }) => {
    const [content, setContent] = useState("")
    const history = useHistory()

    const init = () => {
        if(edit) {
            setContent(seed?.content || "")
        }
    }

    const handleChange = event => {
        setContent(event.target.value)
    }

    const submit = async () => {
        const args = {
            content,
            "blogpost_slug": blogpostSlug
        }
        
        if(edit) {
            gaEvent({
                category: "Comment",
                action: "Edit"
            })

            args.id = seed.id
            await editComment(args)
            history.push(`/post/${blogpostSlug}?commentId=${seed.id}`)
        } else {
            gaEvent({
                category: "Comment",
                action: "Add"
            })

            await addComment(args)
            setContent("")
        }

        onSubmit()
    }

    useEffect(init, [edit, seed])

    return (
        <div className="comment-form" ref={forwardRef}>
            <textarea value={content} onChange={handleChange} placeholder="Leave a comment..."/>
            <button onClick={submit} className="large">{edit ? "Save" : "Post"}</button>
        </div>
    )
}

export default React.forwardRef((props, ref) => <CommentForm forwardRef={ref} {...props}/>)
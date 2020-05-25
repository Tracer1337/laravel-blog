import React, { useEffect } from "react"
import ReactMDE from "react-simplemde-editor"

import { MARKDOWN_EDITOR_MAX_HEIGHT_PX } from "../config/constants.js"

const MarkdownEditor = props => {
    useEffect(() => {
        const srollContainer = document.querySelector(".CodeMirror-scroll")
        
        srollContainer.style.maxHeight = MARKDOWN_EDITOR_MAX_HEIGHT_PX + "px"
    }, [])

    return <ReactMDE {...props} />
}

export default MarkdownEditor
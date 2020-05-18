import React from "react"
import Markdown from "react-markdown"

const getWidth = str => str.match(/w:([^,]*)/)?.[1]
const getHeight = str => str.match(/h:([^,]*)/)?.[1]

const renderers = {
    image: ({ src, alt }) => {
        // Extract dimensions
        let width, height
        if(alt) {
            width = getWidth(alt)
            height = getHeight(alt)
        }

        return <img src={src} style={{ width, height }}/>
    }
}

const MarkdownViewer = (props) => {
    return (
        <Markdown
            {...props}
            renderers={renderers}
        />
    )
}

export default MarkdownViewer
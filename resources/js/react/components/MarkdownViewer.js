import React from "react"
import Markdown from "react-markdown"
import hljs from "highlight.js/lib/core"

import javascript from "highlight.js/lib/languages/javascript"
import scss from "highlight.js/lib/languages/scss"
import xml from "highlight.js/lib/languages/xml"
import python from "highlight.js/lib/languages/python"
import php from "highlight.js/lib/languages/php"

import "highlight.js/styles/github.css"

// Define syntax highlighting
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("scss", scss)
hljs.registerLanguage("xml", xml)
hljs.registerLanguage("python", python)
hljs.registerLanguage("php", php)

const getWidth = str => str.match(/w:([^,]*)/)?.[1]
const getHeight = str => str.match(/h:([^,]*)/)?.[1]

// Define custom renderers
const renderers = {
    image: ({ src, alt }) => {
        // Render image with size extracted from alt prop
        let width, height
        if(alt) {
            width = getWidth(alt)
            height = getHeight(alt)
        }

        return <img src={src} style={{ width, height }}/>
    },

    code: ({ language, value }) => {
        const formatted = hljs.highlight(language, value)

        return (
            <pre>
                <code dangerouslySetInnerHTML={{ __html: formatted.value }}/>
            </pre>
        )
    }
}

const MarkdownViewer = (props) => {
    return (
        <Markdown
            {...props}
            renderers={renderers}
            escapeHtml={false}
            className="markdown"
        />
    )
}

export default MarkdownViewer
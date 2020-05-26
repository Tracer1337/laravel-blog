import React, { useRef, useEffect, useState } from "react"
import Markdown from "react-markdown"
import hljs from "highlight.js/lib/core"

import javascript from "highlight.js/lib/languages/javascript"
import scss from "highlight.js/lib/languages/scss"
import xml from "highlight.js/lib/languages/xml"
import python from "highlight.js/lib/languages/python"
import php from "highlight.js/lib/languages/php"

import "highlight.js/styles/github.css"

import Icon from "./Icon.js"

// Define syntax highlighting
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("scss", scss)
hljs.registerLanguage("xml", xml)
hljs.registerLanguage("python", python)
hljs.registerLanguage("php", php)

const getWidth = str => str.match(/width:([^,]*)/)?.[1]
const getHeight = str => str.match(/height:([^,]*)/)?.[1]
const getAlign = str => str.match(/align:([^,]*)/)?.[1]

// Define custom renderers
const renderers = {
    image: ({ src, alt }) => {
        // Render image with size / pos extracted from alt prop
        let width, height, align
        if(alt) {
            width = getWidth(alt)
            height = getHeight(alt)
            align = getAlign(alt)
        }

        return (
            <div style={{ textAlign: align }}>
                <img src={src} style={{ width, height }}/>
            </div>
        )
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

const TableOfContents = ({ sections }) => {
    if(!sections.length) {
        return null
    }

    return (
        <div className="table-of-contents">
            <hr/>
            
            <h3 className="title">Content</h3>

            {sections.map(({ text, level }, i) => (
                <a href={"#" + text} key={i} className="wrapper-link">
                    {React.createElement("h" + level, { className: ["section-link", "indent-" + level].join(" ") }, 
                        <Icon type="chevron-right" />,
                        text
                    )}
                </a>
            ))}
        </div>
    )
}

const MarkdownViewer = (props) => {
    const headings = useRef([])
    const [sections, setSections] = useState([])
    
    const renderHeading = ({ level, children }) => {
        const text = children[0].props.value

        if(!headings.current.some(h => h.text === text)) {
            headings.current.push({ text, level })
        }

        return (
            <>
                <a name={text}/>
                {React.createElement("h" + level, { children })}
            </>
        )
    }

    useEffect(() => {
        setSections(headings.current)
    }, [])

    return (
        <>
            <TableOfContents sections={sections} />

            <hr/>

            <Markdown
                {...props}
                renderers={{
                    ...renderers,
                    heading: renderHeading
                }}
                escapeHtml={false}
                className="markdown"
            />
        </>
    )
}

export default MarkdownViewer
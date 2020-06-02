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
const getDisplay = str => str.match(/display:([^,]*)/)?.[1]

// Define custom renderers
const renderers = {
    image: ({ src, alt }) => {
        // Render image with size / pos extracted from alt prop
        let width, height, align
        let display = "block"
        if(alt) {
            width = getWidth(alt)
            height = getHeight(alt)
            align = getAlign(alt)
            display = getDisplay(alt)
        }

        return (
            <span style={{ textAlign: align, display }}>
                <img src={src} style={{ width, height }}/>
            </span>
        )
    },

    paragraph: ({ children }) => {
        // Remove parent <p> from images
        if (children[0].type.name === "image") {
            const child = children[0]

            return child
        }

        return <p>{children}</p> 
    },

    code: ({ language, value }) => {
        let formatted = { value }

        if(hljs.getLanguage(language) && value) {
            formatted = hljs.highlight(language, value)
        }

        return (
            <pre className="code-block">
                <code dangerouslySetInnerHTML={{ __html: formatted.value }}/>
            </pre>
        )
    },

    tableCell: ({ isHeader, children }) => {
        if(isHeader) {
            return children.length == 0 ? null : <th>{children}</th>
        }

        return <td>{children}</td>
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

            {sections.map(({ id, text, level }) => (
                <a href={"#" + id} key={id} className="wrapper-link">
                    {React.createElement("h" + level, { className: ["section-link", "indent-" + level].join(" ") }, 
                        <Icon type="chevron-right" />,
                        text
                    )}
                </a>
            ))}

            <hr/>
        </div>
    )
}

const MarkdownViewer = (props) => {
    const headings = useRef([])
    const [sections, setSections] = useState([])
    const [isMounted, setIsMounted] = useState(false)
    
    let index = 0
    const renderHeading = ({ level, children }) => {
        const text = children[0].props.value
        const id = index++
        
        if(!isMounted) {
            headings.current.push({ id, text, level })
        }

        return React.createElement("h" + level, { id, children })
    }

    useEffect(() => {
        setIsMounted(true)
        setSections(headings.current)
    }, [])

    return (
        <>
            <TableOfContents sections={sections} />

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
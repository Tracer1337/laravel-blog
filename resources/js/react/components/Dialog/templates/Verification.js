import React from "react"
import ReactDOM from "react-dom"

import Dialog from "../Dialog.js"

export default (args) => {
    const content = args.content || args
    const subContent = args.subContent || null
    
    return new Promise(resolve => {
        const eventEmitter = new EventTarget()
        const container = document.createElement("div")

        eventEmitter.addEventListener("answer", ({ detail: { value } }) => {
            ReactDOM.unmountComponentAtNode(container)
            resolve(value)
        })

        ReactDOM.render(
            <Dialog
                fields={[
                    {
                        type: "title",
                        value: "Warning"
                    },
                    {
                        type: "textbox",
                        value: content
                    },
                    subContent && (
                        {
                            type: "caption",
                            value: subContent
                        }
                    ),
                    {
                        type: "button",
                        inline: true,
                        value: "Accept",
                        onClick: () => eventEmitter.dispatchEvent(new CustomEvent("answer", { detail: { value: true } }))
                    },
                    {
                        type: "button",
                        inline: true,
                        value: "Decline",
                        onClick: () => eventEmitter.dispatchEvent(new CustomEvent("answer", { detail: { value: false } }))
                    }
                ]}
            />
        , container)
    })
}
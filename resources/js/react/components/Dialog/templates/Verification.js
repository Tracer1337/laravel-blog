import React from "react"
import ReactDOM from "react-dom"

import Dialog from "../Dialog.js"

export default (args) => {
    const content = args.content || args
    const subContent = args.subContent || null
    
    return new Promise(resolve => {
        const container = document.createElement("div")

        const handleAnswer = hasAccepted => {
            ReactDOM.unmountComponentAtNode(container)
            resolve(hasAccepted)
        }

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
                        onClick: () => handleAnswer(true)
                    },
                    {
                        type: "button",
                        inline: true,
                        value: "Decline",
                        onClick: () => handleAnswer(false)
                    }
                ]}
            />
        , container)
    })
}
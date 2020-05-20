import React from "react"

import Dialog from "../Dialog.js"
import renderInRoot from "../../../utils/renderInRoot.js"

export default (args) => {
    const content = args.content || args
    const subContent = args.subContent || null
    
    return new Promise(resolve => {
        const Verifictation = ({ onClose }) => {
            const handleAnswer = hasAccepted => {
                onClose()
                resolve(hasAccepted)
            }

            return (
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
            )
        }

        return renderInRoot(Verifictation)()
    })
}
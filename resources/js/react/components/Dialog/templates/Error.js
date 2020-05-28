import React from "react"

import Dialog from "../Dialog.js"
import renderInRoot from "../../../utils/renderInRoot.js"

const Error = ({ onClose, args: [content, details] }) => {
    console.log(details)

    return (
        <Dialog
            fields={[{
                type: "title",
                value: "Error"
            }, {
                type: "error",
                value: content
            }, {
                type: "caption",
                value: details.message
            }, {
                type: "collapsible",
                label: "Details",
                value: JSON.stringify(details.errors, null, 4)
            }, {
                type: "submit",
                value: "Close"
            }]}
            onSubmit={onClose}
        />
    )
}

export default renderInRoot(Error)
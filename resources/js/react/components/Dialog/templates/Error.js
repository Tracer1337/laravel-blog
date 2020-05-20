import React from "react"

import Dialog from "../Dialog.js"
import renderInRoot from "../../../utils/renderInRoot.js"

const Error = ({ onClose, args: [content] }) => (
    <Dialog
        fields={[{
            type: "title",
            value: "Error"
        }, {
            type: "error",
            value: content
        }, {
            type: "submit",
            value: "Close"
        }]}
        onSubmit={onClose}
    />
)

export default renderInRoot(Error)
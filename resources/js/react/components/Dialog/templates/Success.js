import React from "react"

import Dialog from "../Dialog.js"
import renderInRoot from "../../../utils/renderInRoot.js"

const Success = ({ onClose, args: [content] }) => (
    <Dialog
        fields={[{
            type: "title",
            value: "Success"
        }, {
            type: "success",
            value: content
        }, {
            type: "submit",
            value: "Close"
        }]}
        onSubmit={onClose}
    />
)

export default renderInRoot(Success)
import React from "react"

import Dialog from "../Dialog.js"
import renderInRoot from "../../../utils/renderInRoot.js"

const Success = content => renderInRoot(({ onClose }) => (
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
))

export default Success
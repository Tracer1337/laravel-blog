import React from "react"
import ReactDOM from "react-dom"

import Dialog from "../Dialog.js"

export default (content) => {
    const container = document.createElement("div")

    ReactDOM.render(
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
            onSubmit={() => ReactDOM.unmountComponentAtNode(container)}
        />
    , container)
}
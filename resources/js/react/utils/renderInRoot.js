import React from "react"
import ReactDOM from "react-dom"

function renderInRoot(Child) {
    const container = document.createElement("div")

    return (...args) => ReactDOM.render((
        ReactDOM.createPortal((
            <Child onClose={() => ReactDOM.unmountComponentAtNode(container)} args={[...args]}/>
        ), document.getElementById("root"))
    ), container)
}

export default renderInRoot
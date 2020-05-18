import React from "react"

import icons from "../assets/icons.json"

const sizes = ["large", "small"]

const Icon = ({ type, fontSize, ...props }) => {
    if (!(type in icons)) {
        return <div>Icon {type} not found</div>
    }

    const path = icons[type]

    const setSizeClass = sizes.includes(fontSize)
    const size = !setSizeClass && fontSize

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            dangerouslySetInnerHTML={{__html: path}}
            className={`${props.className || ""} ${setSizeClass ? fontSize : ""}`}
            style={{ fontSize: size+"px" }}
        />
    )
}

export default Icon
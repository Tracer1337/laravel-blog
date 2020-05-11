import React from "react"

const Links = ({ data }) => {
    const links = data.links && JSON.parse(data.links)

    return (
        <div className="links">
            {links && Object.entries(links).map(([ label, url ], i) => (
                <a href={url} target="_blank" key={i}>{label}</a>
            ))}
        </div>
    )
}

export default Links
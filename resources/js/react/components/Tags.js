import React from "react"
import { Link } from "react-router-dom"

const Tags = ({ data }) => (
    <span className="tags">
        {data.map(({ id, name }) => (
            <span className="tag" key={id}>
                <Link to={"/tags/" + id}>
                    {name}
                </Link>
            </span>
        ))}
    </span>
)

export default Tags
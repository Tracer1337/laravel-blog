import React from "react"
import { Link } from "react-router-dom"

const Tags = ({ data }) => (
    <div className="tags">
        <span>Tags:</span>

        {data.tags.map(({ id, name }) => (
            <span className="tag">
                <Link to={"/tags/" + id}>
                    {name}
                </Link>
            </span>
        ))}
    </div>
)

export default Tags
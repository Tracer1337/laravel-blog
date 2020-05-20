import React from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

const Tags = ({ data }) => (
    <span className="tags">
        {!data ? (
            Array(5).fill().map((_, i) => (
                <React.Fragment key={i}>
                    <Skeleton width={20}/>
                    <span className="skeleton-spacer"/>
                </React.Fragment>
            ))
        ) : (
            data.map(({ id, name }) => (
                <span className="tag" key={id}>
                    <Link to={{
                        pathname: "/tags",
                        search: `?tag_ids=${id}`
                    }}>
                        {name}
                    </Link>
                </span>
            ))
        )}
    </span>
)

export default Tags
import React from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

const Topics = ({ data }) => (
    <div className="topics">
        {
            !data ? (
                Array(5).fill().map((_, i) => (
                    <React.Fragment key={i}>
                        <Skeleton width={150} height={48}/>
                        <span className="skeleton-spacer"/>
                    </React.Fragment>
                ))
            ) : (
                data.map(topic => (
                    <Link to={"/topic/" + topic.id} className="chip" key={topic.id}>{topic.name}</Link>
                ))
            )
        }
    </div>
)

export default Topics
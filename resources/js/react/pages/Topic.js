import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import Pagination from "../components/Pagination.js"
import BlogpostCard from "../components/BlogpostCard.js"

import { getTopicBlogposts, getTopic } from "../config/API.js"

const TopicPage = () => {
    const { id } = useParams()
    const [data, setData] = useState()

    useEffect(() => {
        getTopic(id)
            .then(res => setData(res.data.data))
    }, [id])

    return (
        <div className="topic-page">
            <h3 className="title">{data?.name}</h3>

            <Pagination 
                className="paginated-blogposts" 
                fetchMethod={getTopicBlogposts.bind(null, id)} 
                renderChildren={({ data }) => data.map((post, i) => (
                    <BlogpostCard post={post} key={i}/>
                ))}
            />
        </div>
    )
}

export default TopicPage
import React from "react"
import { useParams } from "react-router-dom"

import Pagination from "../components/Pagination.js"
import BlogpostCard from "../components/BlogpostCard.js"

import { getTopicBlogposts } from "../config/API.js"
import useAPIData from "../utils/useAPIData.js"

const TopicPage = () => {
    const { id } = useParams()
    const [data] = useAPIData("getTopic", [id])

    return (
        <div className="topic-page">
            <h3 className="title">{data?.data.name}</h3>

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
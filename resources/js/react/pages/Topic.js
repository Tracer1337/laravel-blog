import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"

import Pagination from "../components/Pagination.js"
import BlogpostCard from "../components/BlogpostCard.js"

import useAPIData from "../utils/useAPIData.js"
import pageTitle from "../config/pageTitle.js"

const TopicPage = () => {
    const { id } = useParams()
    const [data] = useAPIData("getTopic", [id])

    const name = data?.data.name || ""

    return (
        <div className="topic-page">
            <Helmet>
                <title>{pageTitle(name)}</title>
            </Helmet>

            <h3 className="title">{name}</h3>

            <Pagination 
                className="paginated-blogposts" 
                fetchMethod="getTopicBlogposts"
                args={[id]}
                renderChildren={({ data, isLoading }) => {
                    if (!isLoading) {
                        return data.map((post, i) => (
                            <BlogpostCard post={post} key={i} />
                        ))
                    } else {
                        return Array(20).fill().map((_, i) => <BlogpostCard showSkeleton key={i}/>)
                    }
                }}
            />
        </div>
    )
}

export default TopicPage
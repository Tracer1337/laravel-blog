import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"

import Pagination from "../components/Pagination.js"
import BlogpostCard from "../components/BlogpostCard.js"

import { getTagBlogposts } from "../config/API.js"
import useAPIData from "../utils/useAPIData.js"
import pageTitle from "../config/pageTitle.js"

const TagPage = () => {
    const { id } = useParams()
    const [data] = useAPIData("getTag", [id])

    const name = data?.data.name || ""

    console.log(id)

    return (
        <div className="tag-page">
            <Helmet>
                <title>{pageTitle(name)}</title>
            </Helmet>

            <h3 className="title">{name}</h3>

            <Pagination
                className="paginated-blogposts"
                fetchMethod={getTagBlogposts.bind(null, id)}
                renderChildren={({ data, isLoading }) => {
                    if (!isLoading) {
                        return data.map((post, i) => (
                            <BlogpostCard post={post} key={i} />
                        ))
                    } else {
                        return Array(20).fill().map((_, i) => <BlogpostCard showSkeleton key={i} />)
                    }
                }}
            />
        </div>
    )
}

export default TagPage
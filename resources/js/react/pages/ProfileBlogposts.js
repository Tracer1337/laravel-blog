import React from "react"
import { Helmet } from "react-helmet"

import Pagination from "../components/Pagination.js"
import BlogpostCard from "../components/BlogpostCard.js"

import { getProfileBlogposts } from "../config/API.js"
import pageTitle from "../config/pageTitle.js"

const ProfileBlogposts = () => {
    return (
        <div className="profile-blogposts-page">
            <Helmet>
                <title>{pageTitle("My Posts")}</title>
            </Helmet>

            <h3 className="title">My Posts</h3>
            
            <Pagination
                className="paginated-blogposts"
                fetchMethod={getProfileBlogposts}
                renderChildren={({ data }) => data.map((post, i) => (
                    <BlogpostCard post={post} key={i}/>
                ))}
            />
        </div>
    )
}

export default ProfileBlogposts
import React from "react"

import Pagination from "../components/Pagination.js"
import BlogpostCard from "../components/BlogpostCard.js"

import { getProfileBlogposts } from "../config/API.js"

const ProfileBlogposts = () => {
    return (
        <div className="profile-blogposts-page">
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
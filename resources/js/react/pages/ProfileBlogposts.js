import React from "react"

import Pagination from "../components/Pagination.js"
import BlogpostCard from "../components/BlogpostCard.js"

import { getProfileBlogposts } from "../config/API.js"

const ProfileBlogposts = () => {
    return (
        <div className="profile-blogposts">
            <h3 className="title">My Posts</h3>
            
            <Pagination
                fetchMethod={getProfileBlogposts}
                child={({ data }) => data.map(post => (
                    <BlogpostCard post={post}/>
                ))}
            />
        </div>
    )
}

export default ProfileBlogposts
import React from "react"
import { Helmet } from "react-helmet"

import Pagination from "../components/Pagination.js"
import BlogpostDetailed from "../components/BlogpostDetailed.js"

import pageTitle from "../config/pageTitle.js"
import { isMobile } from "../config/constants.js"

const ProfileBlogposts = () => {
    return (
        <div className="profile-blogposts-page">
            <Helmet>
                <title>{pageTitle("My Posts")}</title>
            </Helmet>

            <h3 className="title">My Posts</h3>
            
            <Pagination
                fetchMethod="getProfileBlogposts"
                renderChildren={({ data, isLoading }) => {
                    if(!isLoading) {
                        return data.map((post, i) => (
                            <>
                                {isMobile && <hr/>}
                                <BlogpostDetailed post={post} key={i}/>  
                            </>
                        ))
                    } else {
                        return Array(20).fill().map((_, i) => <BlogpostDetailed showSkeleton key={i}/>)
                    }
                }}
            />
        </div>
    )
}

export default ProfileBlogposts
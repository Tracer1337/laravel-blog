import React from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import useAPIData from "../utils/useAPIData.js"
import { isMobile } from "../config/constants.js"

const FeaturedPost = () => {
    const [data, reload, setData, isLoading] = useAPIData({ method: "getFeaturedPost" })

    if(!data && !isLoading) {
        return null
    }

    const postUrl = data ? "/post/" + data.blogpost.id : ""

    return (
        <>
            <section className="featured-post">
                <div className="text-container">
                    <div className="head">
                        <Link to={postUrl} className="wrapper-link">
                            <div className="blogpost-title">{data ? data.blogpost.title : <Skeleton width={500}/>}</div>
                        </Link>
                        
                        <div className="username">{data ? data.blogpost.user.full_name : <Skeleton width={300}/>}</div>
                    </div>

                    <div className="content">{data ? data.content : <Skeleton height={200}/>}</div>
                </div>

                <div className="image-container">
                    <div className="inner-image-container">
                        <Link to={postUrl}>
                            {data ? <img alt="cover" src={data.blogpost.cover?.url}/> : <Skeleton height={500}/>}
                        </Link>
                    </div>
                </div>
            </section>

            {isMobile && <hr/>}
        </>
    )
}

export default FeaturedPost
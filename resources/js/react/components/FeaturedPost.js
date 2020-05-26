import React from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import useAPIData from "../utils/useAPIData.js"

const FeaturedPost = () => {
    const [data, reload, setData, isLoading] = useAPIData({ method: "getFeaturedPost" })

    if(!data && !isLoading) {
        return null
    }

    return (
        <section className="featured-post-wrapper">
            <h3 className="title">Featured Post</h3>

            <div className="featured-post">
                <div className="text-container">
                    <div className="head">
                        <div className="blogpost-title">{data ? data.blogpost.title : <Skeleton width={500}/>}</div>
                        <div className="username">{data ? data.blogpost.user.full_name : <Skeleton width={300}/>}</div>
                    </div>

                    <div className="content">{data ? data.content : <Skeleton height={200}/>}</div>
                </div>

                <div className="image-container">
                    <div className="inner-image-container">
                        <Link to={data ? "/post/" + data.blogpost.id : ""}>
                            {data ? <img alt="cover" src={data.blogpost.cover?.url}/> : <Skeleton height={500}/>}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedPost
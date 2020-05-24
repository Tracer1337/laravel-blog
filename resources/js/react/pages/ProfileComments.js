import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import Pagination from "../components/Pagination.js"
import Date from "../components/Date.js"

import pageTitle from "../config/pageTitle.js"

const Comment = ({ data }) => {
    return (
        <Link to={!data ? "" : `/post/${data.blogpost_id}?commentId=${data.id}`} className="wrapper-link">
            <div className="card comment">
                <div className="head">
                    <div><span className="prefix">Post:</span> {!data ? <Skeleton width={400}/> : data.blogpost_title}</div>
                    {!data ? <Skeleton width={100}/> : <Date timestamp={data.created_at} className="date"/>}
                </div>

                <div>{!data ? <Skeleton count={2} width={868}/> : data.content}</div>
            </div>
        </Link>
    )
}

const ProfileComments = () => (
    <main className="profile-comments-page">
        <Helmet>
            <title>{pageTitle("My Comments")}</title>
        </Helmet>

        <h3 className="title">My Comments</h3>

        <Pagination
            fetchMethod="getProfileComments"
            renderChildren={({ data }) => {
                if(!data) {
                    return Array(20).fill().map((_, i) => <Comment key={i}/>)
                }

                return data.map((comment, i) => <Comment data={comment} key={i}/>)
            }}
        />
    </main>
)

export default ProfileComments
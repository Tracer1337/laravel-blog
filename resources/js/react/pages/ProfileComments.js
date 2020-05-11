import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

import Pagination from "../components/Pagination.js"
import Date from "../components/Date.js"

import { getProfileComments } from "../config/API.js"
import pageTitle from "../config/pageTitle.js"

const Comment = ({ data }) => {
    return (
        <Link to={`/blogpost/${data.blogpost_id}?commentId=${data.id}`} className="wrapper-link">
            <div className="card comment">
                <div className="head">
                    <div><span className="prefix">In:</span> {data.blogpost_title}</div>
                    <Date timestamp={data.created_at} className="date"/>
                </div>

                <div>{data.content}</div>
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
            fetchMethod={getProfileComments}
            renderChildren={({ data }) => data.map((comment, i) => <Comment data={comment} key={i}/>)}
        />
    </main>
)

export default ProfileComments
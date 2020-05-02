import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Markdown from "react-markdown"

import Layout from "../components/Layout/Layout.js"
import TopicCrumb from "../components/Blogpost/TopicCrumb.js"
import Head from "../components/Blogpost/Head.js"
import Actions from "../components/Blogpost/Actions.js"
import Tags from "../components/Blogpost/Tags.js"
import Comments from "../components/Blogpost/Comments.js"
import CommentForm from "../components/Blogpost/CommentForm.js"
import RelatedPosts from "../components/Blogpost/RelatedPosts.js"
import Auth from "../components/Auth.js"

import { getBlogpost } from "../config/API.js"

const BlogpostPage = () => {
    const { id } = useParams()

    const [data, setData] = useState()

    const fetchPost = () => {
        return new Promise(async resolve => {
            const res = await getBlogpost(id)

            // Reverse comments => Push newest to the top
            res.data.data.comments.reverse()

            setData(res.data.data)
            resolve()
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchPost()
    }, [id])

    if (!data) {
        return <></>
    }

    return (
        <>
            <TopicCrumb name={data.topic.name} />

            <div className="blogpost">
                <main>
                    <Head data={data} />

                    <hr />

                    <div className="blogpost-title">{data.title}</div>

                    <div className="content">
                        <Markdown source={data.content} />
                    </div>

                    <Auth>
                        <Actions data={data} onAction={fetchPost} id={id} />
                    </Auth>

                    <hr />

                    <Tags data={data} />

                    <div className="spacer" />

                    <Comments comments={data.comments} />

                    <div className="spacer" />

                    <Auth>
                        <CommentForm blogpostId={id} onSubmit={fetchPost} />

                        <div className="spacer" />
                    </Auth>
                </main>

                {data.relations.length > 0 && (
                    <>
                        <RelatedPosts relations={data.relations} />
                        <div className="spacer" />
                    </>
                )}
            </div>
        </>
    )
}

export default BlogpostPage
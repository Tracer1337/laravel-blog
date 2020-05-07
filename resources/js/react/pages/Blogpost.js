import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import Markdown from "react-markdown"

import TopicCrumb from "../components/Blogpost/TopicCrumb.js"
import Head from "../components/Blogpost/Head.js"
import Actions from "../components/Blogpost/Actions.js"
import Tags from "../components/Blogpost/Tags.js"
import Comments from "../components/Blogpost/Comments.js"
import CommentForm from "../components/Blogpost/CommentForm.js"
import RelatedPosts from "../components/Blogpost/RelatedPosts.js"
import Auth from "../components/Auth.js"

import { getBlogpost } from "../config/API.js"
import useQuery from "../utils/useQuery.js"

const BlogpostPage = () => {
    const { id } = useParams()
    const commentId = parseInt(useQuery("commentId"))
    const editComment = useQuery("editComment") === "true"
    const formRef = useRef()

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

    const handleQuery = () => {
        if (commentId && editComment) {
            formRef.current?.scrollIntoView()
        } else if (commentId) {
            const domElement = document.querySelector(`.comment[data-id="${commentId}"]`)
            domElement?.scrollIntoView()
            domElement?.classList.add("highlighted")
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchPost().then(handleQuery)
    }, [id])

    useEffect(handleQuery, [commentId, editComment])

    if (!data) {
        return <></>
    }

    const editCommentObject = data.comments.find(comment => comment.id == commentId)

    return (
        <>
            <TopicCrumb name={data.topic.name} />

            <div className="blogpost-page">
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

                    <Comments comments={data.comments} onAction={fetchPost} />

                    <div className="spacer" />

                    <Auth>
                        <CommentForm blogpostId={id} onSubmit={fetchPost} ref={formRef} edit={editComment} seed={editCommentObject}/>

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
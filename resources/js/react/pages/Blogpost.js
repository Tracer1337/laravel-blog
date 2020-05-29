import React, { useEffect, useRef } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import TopicCrumb from "../components/Blogpost/TopicCrumb.js"
import Head from "../components/Blogpost/Head.js"
import Actions from "../components/Blogpost/Actions.js"
import Tags from "../components/Blogpost/Tags.js"
import Comments from "../components/Blogpost/Comments.js"
import CommentForm from "../components/Blogpost/CommentForm.js"
import RelatedPosts from "../components/Blogpost/RelatedPosts.js"
import Auth from "../components/Auth.js"
import MarkdownViewer from "../components/MarkdownViewer.js"

import useQuery from "../utils/useQuery.js"
import useAPIData from "../utils/useAPIData.js"
import pageTitle from "../config/pageTitle.js"
import { isMobile } from "../config/constants.js"

const BlogpostPage = () => {
    const { id } = useParams()
    const commentId = parseInt(useQuery("commentId"))
    const editComment = useQuery("editComment") === "true"
    const formRef = useRef()

    const [data, reload, setData] = useAPIData({
        method: "getBlogpost",
        args: [id],
        removeDataBeforeLoading: false
    })

    const handleQuery = () => {
        if (commentId && editComment) {
            formRef.current?.scrollIntoView()
        } else if (commentId) {
            const domElement = document.querySelector(`.comment[data-id="${commentId}"]`)
            domElement?.scrollIntoView()
            domElement?.classList.add("highlighted")
        }
    }

    const handleAction = data => {
        setData(data)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    useEffect(handleQuery, [commentId, editComment])

    useEffect(() => {
        // Enable smooth scrolling
        document.documentElement.style.scrollBehavior = "smooth"

        // Disable smooth scrolling when leaving page
        return () => document.documentElement.style.scrollBehavior = null
    }, [])

    const post = data ? data.data : {}

    const editCommentObject = post.comments?.find(comment => comment.id == commentId)

    return (
        <>
            <Helmet>
                {post.title && <title>{pageTitle(post.title)}</title>}
            </Helmet>

            <div className="blogpost-page">
                <TopicCrumb data={post.topic}/>

                <main className="body">
                    <Head data={post} />

                    <hr />

                    <div className="blogpost-title">{post.title || <Skeleton/>}</div>

                    <div className="reading-time">
                        {post.content ? `${post.estimated_reading_time} minutes read` : <Skeleton/>}
                    </div>

                    <div className="content">
                        {post.content ? <MarkdownViewer source={post.content}/> : <Skeleton count={30}/>}
                    </div>

                    <hr />

                    <Auth>
                        <Actions data={post} onAction={handleAction} id={id}/>
                    </Auth>

                    <div className="spacer-small"/>

                    <Tags data={post} />

                    <div className="spacer" />

                    <Comments comments={post?.comments} onAction={reload} />

                    <div className="spacer" />

                    <Auth>
                        <CommentForm blogpostId={id} onSubmit={reload} ref={formRef} edit={editComment} seed={editCommentObject}/>

                        <div className="spacer" />
                    </Auth>
                </main>

                {post.relations?.length > 0 && (
                    <>
                        <RelatedPosts relations={post.relations} />

                        {!isMobile && <div className="spacer"/>}
                    </>
                )}
            </div>
        </>
    )
}

export default BlogpostPage
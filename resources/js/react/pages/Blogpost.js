import React, { useEffect, useRef } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import Markdown from "react-markdown"
import Skeleton from "react-loading-skeleton"

import TopicCrumb from "../components/Blogpost/TopicCrumb.js"
import Head from "../components/Blogpost/Head.js"
import Actions from "../components/Blogpost/Actions.js"
import Tags from "../components/Blogpost/Tags.js"
import Comments from "../components/Blogpost/Comments.js"
import CommentForm from "../components/Blogpost/CommentForm.js"
import RelatedPosts from "../components/Blogpost/RelatedPosts.js"
import Auth from "../components/Auth.js"

import useQuery from "../utils/useQuery.js"
import useAPIData from "../utils/useAPIData.js"
import pageTitle from "../config/pageTitle.js"

const BlogpostPage = () => {
    const { id } = useParams()
    const commentId = parseInt(useQuery("commentId"))
    const editComment = useQuery("editComment") === "true"
    const formRef = useRef()

    const [data, reload] = useAPIData("getBlogpost", [id])

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
    }, [id])

    useEffect(handleQuery, [commentId, editComment])

    const post = data ? data.data : {}

    const editCommentObject = post.comments?.find(comment => comment.id == commentId)

    return (
        <>
            <Helmet>
                <title>{pageTitle(post.title)}</title>
                <meta name="description" content={post.teaser}/>
            </Helmet>

            <div className="blogpost-page">
                <TopicCrumb data={post.topic}/>

                <main>
                    <Head data={post} />

                    <hr />

                    <div className="blogpost-title">{post.title || <Skeleton/>}</div>

                    <div className="content">
                        {post.content ? <Markdown source={post.content}/> : <Skeleton count={30}/>}
                    </div>

                    <hr />

                    <Auth>
                        <Actions data={post} onAction={reload} id={id}/>
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
                        <div className="spacer" />
                    </>
                )}
            </div>
        </>
    )
}

export default BlogpostPage
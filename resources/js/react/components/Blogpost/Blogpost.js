import React, { useState, useEffect } from "react"
import Markdown from "react-markdown"

import TopicCrumb from "./TopicCrumb.js"
import Head from "./Head.js"
import Actions from "./Actions.js"
import Tags from "./Tags.js"
import Comments from "./Comments.js"
import CommentForm from "./CommentForm.js"
import RelatedPosts from "./RelatedPosts.js"
import Auth from "../Auth.js"

import { getBlogpost } from "../../config/API.js"

const Blogpost = ({ id }) => {
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
        
    if(!data) {
        return <></>
    }

    return (
        <>
            <TopicCrumb name={data.topic.name}/>

            <div className="blogpost">
                <main>
                    <Head data={data}/>

                    <hr/>

                    <div className="blogpost-title">{data.title}</div>
                    
                    <div className="content">
                        <Markdown source={data.content}/>
                    </div>

                    <Auth>
                        <Actions data={data} onAction={fetchPost} id={id}/>
                    </Auth>

                    <hr/>

                    <Tags data={data}/>

                    <div className="spacer"/>

                    <Comments comments={data.comments}/>

                    <div className="spacer"/>

                    <Auth>
                        <CommentForm blogpostId={id} onSubmit={fetchPost}/>

                        <div className="spacer"/>
                    </Auth>
                </main>

                {data.relations.length > 0 && (
                    <>
                        <RelatedPosts relations={data.relations}/>
                        <div className="spacer"/>
                    </>
                )}

            </div>
        </>
    )
}

export default Blogpost

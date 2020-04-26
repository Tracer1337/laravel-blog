import React, { useEffect, useState } from "react"
import ChevronRight from "@material-ui/icons/ChevronRight"
import ChevronLeft from "@material-ui/icons/ChevronLeft"

import BlogpostCard from "./BlogpostCard.js"

const postWidth = 350
const postMargin = 20
const postOffsetWidth = postWidth + postMargin

const HorizontalScrollablePosts = ({ fetchMethod }) => {
    const [posts, setPosts] = useState([])
    const [data, setData] = useState()
    const [pageNr, setPageNr] = useState(1)

    const fetchPosts = () => {
        fetchMethod(pageNr).then(res => {
            const newPosts = posts
            res.data.data.forEach(post => {
                if(!newPosts.some(p => p.id === post.id)) {
                    newPosts.push(post)
                }
            })
            
            setData(res.data)
            setPosts(newPosts)
            setHighestPageNr(pageNr)
        })
    }

    const prev = () => {
        setPageNr(pageNr - 1)
    }

    const next = () => {
        setPageNr(pageNr + 1)
    }

    useEffect(fetchPosts, [pageNr])

    if (!data) {
        return <></>
    }

    console.log(data, posts)

    return (
        <div className="horizontal-scrollable-posts">
            {data.links.prev && (
                <div className="scroll-arrow left" onClick={prev}>
                    <ChevronLeft fontSize="large"/>
                </div>
            )}

            <div className="posts" style={{transform: `translateX(${postOffsetWidth * 5 * (pageNr - 1) * -1}px)`}}>
                {posts.map(post => <BlogpostCard post={post} key={post.id}/>)}
            </div>

            {data.links.next && (
                <div className="scroll-arrow" onClick={next}>
                    <ChevronRight fontSize="large"/>
                </div>
            )}
        </div>
    )
}

export default HorizontalScrollablePosts
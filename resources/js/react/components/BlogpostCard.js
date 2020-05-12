import React, { useMemo, useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Date from "./Date.js"

import getImageGradient from "../utils/getImageGradient.js"

const coverRatio = 4 / 3

// Check if image has correct ratio (coverRatio)
const fitsIntoCard = async coverUrl => {
    return new Promise(resolve => {
        const image = new Image()
        image.onload = function() {
            const hasCorrectDimensions = this.width / this.height === coverRatio
            resolve(hasCorrectDimensions)
        }
        image.src = coverUrl
    })
}

const BlogpostCard = ({ post }) => {
    const coverUrl = useMemo(() => {
        return post.assets.find(asset => asset.type === "cover")?.url
    }, [])

    const [coverGradient, setCoverGradient] = useState()

    useEffect(() => {
        (async function() {
            const hasCorrectDimensions = await fitsIntoCard(coverUrl)
            if(!hasCorrectDimensions) {
                const gradient = await getImageGradient(coverUrl)
                setCoverGradient(gradient)
            }
        })()
    }, [coverUrl])

    return (
        <Link to={"/blogpost/"+post.id} className="blogpost-card-wrapper">
            <div className="blogpost-card">
                <div className="image-wrapper" style={{ backgroundImage: coverGradient }}>
                    {coverUrl && (
                        <img src={coverUrl} alt="cover"/>
                    )}
                </div>

                <div className="body">
                    <div className="top">
                        <div className="left author">{post.user.username}</div>
                        <Date timestamp={post.published_at} className="right published-date"/>
                    </div>

                    <div className="bottom">
                        <div className="left teaser">{post.teaser}</div>
                        <div className="right topic">{post.topic.name}</div>
                    </div>

                    <div className="title">{post.title}</div>
                </div>
            </div>
        </Link>
    )
}

export default BlogpostCard
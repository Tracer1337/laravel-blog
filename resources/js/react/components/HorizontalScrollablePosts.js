import React, { useEffect, useState, useRef } from "react"
import ChevronRight from "@material-ui/icons/ChevronRight"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import Slider from "react-slick"

import BlogpostCard from "./BlogpostCard.js"

const cardWidth = 350

// Generate responsive breakpoints for slider
const responsive = []
for (let i = cardWidth * 5; i > cardWidth; i -= cardWidth) {
    const slides = Math.floor(i / cardWidth) - 1
    responsive.push({
        breakpoint: i,
        settings: {
            slidesToScroll: slides,
            slidesToShow: slides
        }
    })
}


const sliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: true,
    dots: true,
    draggable: true,
    responsive
}

const HorizontalScrollablePosts = (props) => {
    const [posts, setPosts] = useState(props.posts)
    const slider = useRef()

    const fetchPosts = async () => {
        const res = await props.fetchMethod()
        setPosts(res.data.data)
    }

    const prev = () => {
        slider.current.slickPrev()
    }

    const next = () => {
        slider.current.slickNext()
    }

    useEffect(() => {
        if(!posts) {
            fetchPosts()
        }
    }, [])

    if (!posts) {
        return <></>
    }

    return (
        <div className="horizontal-scrollable-posts">
            <div className="scroll-arrow left" onClick={prev}>
                <ChevronLeft fontSize="large"/>
            </div>

            <Slider
                ref={slider}
                {...sliderSettings}
            >
                {posts.map(post => <BlogpostCard post={post} key={post.id}/>)}
            </Slider>


            <div className="scroll-arrow right" onClick={next}>
                <ChevronRight fontSize="large"/>
            </div>
        </div>
    )
}

export default HorizontalScrollablePosts
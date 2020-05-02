import React, { useEffect, useState, useRef } from "react"
import ChevronRight from "@material-ui/icons/ChevronRight"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import Slider from "react-slick"

import BlogpostCard from "./BlogpostCard.js"

const cardWidth = 350

const sliderSettings = {
    slidesToShow: 5,
    infinite: true,
    dots: true,
    draggable: true
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
        } else if (props.posts) {
            setPosts(props.posts)
        }
    }, [props.posts])

    if (!posts) {
        return <></>
    }

    const slidesToShow = posts.length < sliderSettings.slidesToShow ? posts.length : sliderSettings.slidesToShow

    // Generate responsive breakpoints for slider
    const responsive = []
    for (let i = cardWidth * 5; i > cardWidth; i -= cardWidth) {
        const slides = Math.min(Math.floor(i / cardWidth) - 1, slidesToShow)
        responsive.push({
            breakpoint: i,
            settings: {
                slidesToScroll: slides,
                slidesToShow: slides
            }
        })
    }

    return (
        <div className="horizontal-scrollable-posts">
            <div className="scroll-arrow left" onClick={prev}>
                <ChevronLeft fontSize="large"/>
            </div>

            <Slider
                ref={slider}
                {...sliderSettings}
                slidesToShow={slidesToShow}
                slidesToScroll={slidesToShow}
                responsive={responsive}
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
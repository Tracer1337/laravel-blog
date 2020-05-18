import React, { useEffect, useState, useRef, useImperativeHandle } from "react"
import ChevronRight from "@material-ui/icons/ChevronRight"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import Slider from "react-slick"

import BlogpostCard from "./BlogpostCard.js"

import useAPIData from "../utils/useAPIData.js"
import { isMobile } from "../config/constants.js"

const cardWidth = 350

const sliderSettings = {
    slidesToShow: 5,
    infinite: true,
    dots: true,
    draggable: true
}

const HorizontalScrollablePosts = (props, ref) => {
    const [posts, setPosts] = useState(props.posts)
    const [data, refresh] = props.fetchMethod ? useAPIData(props.fetchMethod) : []

    const slider = useRef()

    const prev = () => {
        slider.current.slickPrev()
    }

    const next = () => {
        slider.current.slickNext()
    }

    useEffect(() => {
        if (props.posts) {
            setPosts(props.posts)
        }
    }, [props.posts])

    useImperativeHandle(ref, () => ({ refresh }))

    const isLoading = (!props.fetchMethod && !posts) || (props.fetchMethod && !data)

    const renderPosts = isLoading ? Array(5).fill() : props.fetchMethod ? data.data : posts

    if(!renderPosts.length && !isLoading) {
        return null
    }

    if(isMobile) {
        return renderPosts.map((post, i) => <BlogpostCard post={post} showSkeleton={isLoading} key={i} />)
    }

    let slidesToShow
    if(!isLoading) {
        slidesToShow = renderPosts.length < sliderSettings.slidesToShow ? renderPosts.length : sliderSettings.slidesToShow
    } else {
        slidesToShow = sliderSettings.slidesToShow
    }

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
                {renderPosts.map((post, i) => <BlogpostCard post={post} showSkeleton={isLoading} key={i}/>)}
            </Slider>


            <div className="scroll-arrow right" onClick={next}>
                <ChevronRight fontSize="large"/>
            </div>
        </div>
    )
}

export default React.forwardRef(HorizontalScrollablePosts)
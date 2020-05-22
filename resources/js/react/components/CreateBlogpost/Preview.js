import React, { useEffect, useState, useMemo } from "react"
import { useFormContext } from "react-hook-form"

import BlogpostCard from "../BlogpostCard.js"
import GradientGapConfig from "./GradientGapConfig.js"

import getImageGradient from "../../utils/getImageGradient.js"

const gradientInputName = "cover->gradient"
const gradientGapDefaultValue = .8

const Preview = ({ data }) => {
    const { register, setValue } = useFormContext()

    const [gradient, setGradient] = useState()

    const cover = data?.assets.find(asset => asset.type === "cover")

    // Format data for BlogpostCard
    const formattedData = useMemo(() => {
        if(data) {
            // Add gradient from state
            if(cover && gradient) {
                cover.meta.gradient = gradient
            }
        }

        return data
    }, [data, gradient])

    const handleGapChange = async gapSize => {
        if(cover.url) {
            const gradient = await getImageGradient(cover.url, gapSize)
            setGradient(gradient)
            setValue(gradientInputName, gradient)
        }
    }

    useEffect(() => {
        register({ name: gradientInputName })
    }, [register])

    useEffect(() => {
        if(data?.assets) {
            if(cover && !cover.meta.gradient) {
                handleGapChange(gradientGapDefaultValue)
            }
        }
    }, [data?.assets])

    return (
        <div>
            <h3 className="title">Preview</h3>

            {formattedData ? (
                <>
                    <BlogpostCard post={formattedData}/>

                    <div className="spacer-small"/>

                    <GradientGapConfig defaultValue={gradientGapDefaultValue} onChange={handleGapChange} imgSrc={cover?.url}/>
                </>
            ) : (
                <em>Preview is not available</em>
            )}
        </div>
    )
}

export default Preview
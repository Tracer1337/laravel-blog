import React, { useEffect, useState, useMemo } from "react"
import { useFormContext } from "react-hook-form"

import BlogpostCard from "../BlogpostCard.js"

import getImageGradient from "../../utils/getImageGradient.js"

const gradientInputName = "cover->gradient"

const Preview = ({ data }) => {
    const { register, setValue } = useFormContext()

    const [gradient, setGradient] = useState()

    // Format data for BlogpostCard
    const formattedData = useMemo(() => {
        if(data) {
            const cover = data.assets.find(asset => asset.type === "cover")
    
            // Add gradient from state
            if(cover && gradient) {
                cover.meta.gradient = gradient
            }
        }

        return data
    }, [data, gradient])

    const handleGapChange = async event => {
        const gap = event.target.value
        const coverUrl = data.assets.find(asset => asset.type === "cover").url
        if(coverUrl) {
            const gradient = await getImageGradient(coverUrl, gap)
            setGradient(gradient)
            setValue(gradientInputName, gradient)
        }
    }

    useEffect(() => {
        register({ name: gradientInputName })
    }, [register])

    return (
        <div>
            <h3 className="title">Preview</h3>

            {formattedData ? (
                <>
                    <BlogpostCard post={formattedData}/>

                    <h4>Gradient Gap</h4>
                    <input type="number" min="0" max=".9" step=".1" defaultValue="0.8" onChange={handleGapChange} />
                </>
            ) : (
                <em>Preview is not available</em>
            )}
        </div>
    )
}

export default Preview
import React, { useState } from "react"

import GradientGapVisualisation from "./GradientGapVisualisation.js"

const GradientGapConfig = ({ defaultValue, onChange, imgSrc }) => {
    const [sliderValue, setSliderValue] = useState(defaultValue)

    const handleChange = event => {
        const newValue = event.target.value
        setSliderValue(newValue)
        onChange(newValue)
    }

    return (
        <div className="gradient-config">
            <h3 className="title">Gradient</h3>

            <form>
                <label>Gap Size</label>
                <input type="number" min="0" max=".9" step=".1" value={sliderValue} className="input" onChange={handleChange} />
            </form>

            <div className="img-wrapper">
                <GradientGapVisualisation imgSrc={imgSrc} gapSize={sliderValue} />
            </div>
        </div>
    )
}

export default GradientGapConfig
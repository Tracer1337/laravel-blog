import React from "react"

const transformUrl = url => window.location.origin + url

const AvailableImages = ({ data }) => {
    return (
        <div className="available-images">
            <label>Available Images</label>

            {data.map((url, i) => {
                const newUrl = transformUrl(url)

                return (
                    <div className="item card" key={i}>
                        <div className="image-wrapper">
                            <img src={newUrl} alt="preview" />
                        </div>

                        <span>{newUrl}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default AvailableImages
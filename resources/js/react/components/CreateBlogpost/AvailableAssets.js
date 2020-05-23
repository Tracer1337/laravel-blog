import React from "react"

import Icon from "../Icon.js"

import { deleteBlogpostAsset } from "../../config/API.js"

const AvailableAssets = ({ data, onRemove }) => {
    const handleRemove = filename => {
        deleteBlogpostAsset(filename).then(() => onRemove())
    }

    return (
        <div className="available-assets">
            <label>Available Assets</label>

            {data.map(({ filename, url, type, mime_type }, i) => {
                const downloadUrl = url.replace("view", "download")

                return (
                    <div className="card" key={i}>
                        <div className="item">
                            <div className="preview">
                                {mime_type.includes("image") ? (
                                    <img src={url} alt="preview" />
                                ) : (
                                        <em>Not available</em>
                                    )}
                            </div>

                            <div className="meta">
                                <span>{type}</span>
                                <span>{url}</span>
                                <span>{downloadUrl}</span>
                            </div>
                        </div>

                        <div className="item">
                            <Icon type="delete" className="icon" onClick={() => handleRemove(filename)} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AvailableAssets
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

            {data.map(({ filename, url, type }, i) => (
                <div className="card" key={i}>
                    <div className="item">
                        <div className="preview">
                            <img src={url} alt="preview"/>
                        </div>

                        <div className="meta">
                            <span>{type}</span>
                            <span>{url}</span>
                        </div>
                    </div>

                    <div className="item">
                        <Icon type="delete" className="icon" onClick={() => handleRemove(filename)}/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AvailableAssets
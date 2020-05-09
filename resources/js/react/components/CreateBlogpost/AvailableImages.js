import React from "react"
import DeleteIcon from "@material-ui/icons/Delete"

import { deleteBlogpostAsset } from "../../config/API.js"

const transformUrl = url => window.location.origin + url

const AvailableImages = ({ data, onRemove }) => {
    const handleRemove = filename => {
        deleteBlogpostAsset(filename).then(() => onRemove(filename))
    }

    return (
        <div className="available-images">
            <label>Available Images</label>

            {data.map(({ filename, url}, i) => {
                const newUrl = transformUrl(url)

                return (
                    <div className="card" key={i}>
                        <div className="item">
                            <div className="image-wrapper">
                                <img src={newUrl} alt="preview" />
                            </div>

                            <span>{newUrl}</span>
                        </div>

                        <div className="item">
                            <DeleteIcon className="icon" onClick={() => handleRemove(filename)}/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AvailableImages
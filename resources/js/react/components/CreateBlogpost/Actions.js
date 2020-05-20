import React from "react"

import Icon from "../Icon.js"

const Actions = ({ onSubmit, editData }) => {
    return (
        <div className="actions">
            <button className="submit" onClick={() => onSubmit(0)}>
                <Icon type="save" className="icon" />
                <span>Save</span>
            </button>

            {!editData?.published_at ? (
                <button className="submit" onClick={() => onSubmit(1)}>
                    <Icon type="send" className="icon" />
                    <span>Publish</span>
                </button>
            ) : (
                <button className="submit" onClick={() => onSubmit(2)}>
                    <Icon type="unpublish" className="icon" />
                    <span>Unpublish</span>
                </button>
            )}
        </div>
    )
}

export default Actions
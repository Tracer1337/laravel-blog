import React, { useState } from "react"

let idCounter = 0

const File = ({ accept, label, onChange, icon }) => {
    const [id] = useState(idCounter++)
    const htmlId = "file_upload_" + id

    const handleChange = event => {
        onChange(event.target.files[0])
    }

    return (
        <div className="file-input-wrapper">
            <input type="file" accept={accept} id={htmlId} style={{display: "none"}} onChange={handleChange}/>
            <label htmlFor={htmlId}>
                {icon && React.createElement(icon, {
                    className: "icon"
                })}
                <span>
                    Upload {label}
                </span>
            </label>
        </div>
    )
}

export default File
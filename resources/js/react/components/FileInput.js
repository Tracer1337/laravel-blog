import React, { useState } from "react"

let idCounter = 0

const FileInput = ({ accept, onChange, icon, ...props }) => {
    const [id] = useState(idCounter++)
    const [label, setLabel] = useState(props.label)

    const htmlId = "file_upload_" + id

    const handleChange = event => {
        onChange(event.target.files[0])
        setLabel(event.target.files[0].name || props.label)
    }

    return (
        <div className="file-input-wrapper">
            <input type="file" accept={accept} id={htmlId} style={{display: "none"}} onChange={handleChange}/>
            <label htmlFor={htmlId}>
                {icon && React.createElement(icon, {
                    className: "icon"
                })}
                <span>{label}</span>
            </label>
        </div>
    )
}

export default FileInput
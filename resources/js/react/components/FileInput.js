import React, { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"

let idCounter = 0

const FileInput = ({ accept, onChange, icon, name, useHooks, className, ...props }) => {
    const formHooks = useFormContext()

    const [id] = useState(idCounter++)
    const [label, setLabel] = useState(props.label)

    const htmlId = "file_upload_" + id

    const handleChange = event => {
        const file = event.target.files[0]
        onChange?.(file, name)
        setLabel(file.name || props.label)

        if(useHooks) {
            formHooks.setValue(name, file)
        }
    }

    useEffect(() => {
        if(useHooks) {
            formHooks.register({ name })
        }
    }, [formHooks])

    return (
        <div className={`file-input-wrapper ${className || ""}`}>
            <input
                type="file"
                accept={accept}
                id={htmlId}
                style={{display: "none"}}
                onChange={handleChange}
            />

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
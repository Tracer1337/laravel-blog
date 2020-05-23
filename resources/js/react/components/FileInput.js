import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { useFormContext } from "react-hook-form"

import Icon from "./Icon.js"
import Dialog from "./Dialog/Dialog.js"

let idCounter = 0

const FileInput = ({ accept, onChange, icon, name, useHooks, className, maxFileSizeMB, ...props }) => {
    const formHooks = useFormContext()

    const [id] = useState(idCounter++)
    const [label, setLabel] = useState(props.label)
    const [size, setSize] = useState()

    const htmlId = "file_upload_" + id

    const handleChange = event => {
        const file = event.target.files[0]

        if (file.size / 1024 / 1024 > maxFileSizeMB) {
            Dialog.error(`The file is too large (Max: ${maxFileSizeMB}MB)`)
            return
        }

        onChange?.(file, name)
        setLabel(file.name || props.label)
        setSize(file.size)

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
                {icon && <Icon type={icon} className="icon"/>}

                {size && <span className="size">{Math.round(size / 1024 / 1024 * 100) / 100}MB</span>}

                <span>{label}</span>
            </label>
        </div>
    )
}

const mapStateToProps = store => ({
    maxFileSizeMB: store.serverConfig.max_file_size_mb
})

export default connect(mapStateToProps)(FileInput)
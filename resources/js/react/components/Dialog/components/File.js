import React, { useState } from "react"
import { Button } from "@material-ui/core"

let idCounter = 0

const File = ({ accept, label, onChange }) => {
    const [id] = useState(idCounter++)
    const htmlId = "file_upload_" + id

    const handleChange = event => {
        onChange(event.target.files[0])
    }

    return (
        <div>
            <input type="file" accept={accept} id={htmlId} style={{display: "none"}} onChange={handleChange}/>
            <label htmlFor={htmlId}>
                <Button variant="outlined" color="primary" component="span">
                    Upload { label }
                </Button>
            </label>
        </div>
    )
}

export default File
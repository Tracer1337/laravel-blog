import React from "react"

import MultiFileInput from "../MultiFileInput.js"

const ImageUpload = () => {
    return (
        <div className="image-upload">
            <MultiFileInput label="Upload Image" icon="add-a-photo" accept="image/*" useHooks name="images"/>
        </div>
    )
}

export default ImageUpload
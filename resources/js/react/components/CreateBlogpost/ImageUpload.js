import React from "react"
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto"

import MultiFileInput from "../MultiFileInput.js"

const ImageUpload = () => {
    return (
        <div className="image-upload">
            <MultiFileInput label="Upload Image" icon={AddAPhotoIcon} accept="image/*" useHooks name="images"/>
        </div>
    )
}

export default ImageUpload
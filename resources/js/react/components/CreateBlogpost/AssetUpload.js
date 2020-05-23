import React from "react"

import MultiFileInput from "../MultiFileInput.js"

const AssetUpload = () => {
    return (
        <div className="asset-upload">
            <MultiFileInput label="Upload Asset" icon="upload" useHooks name="assets"/>
        </div>
    )
}

export default AssetUpload
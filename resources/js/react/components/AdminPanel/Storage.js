import React from "react"
import Skeleton from "react-loading-skeleton"
import DeleteIcon from "@material-ui/icons/Delete"

import Pagination from "../Pagination.js"
import Dialog from "../Dialog/Dialog.js"

import { deleteAsset } from "../../config/API.js"

const Storage = () => {
    const handleRemove = async asset => {
        const shouldRemove = await Dialog.verify(`"${asset.filename}" will be removed`)

        if(shouldRemove) {
            deleteAsset(asset.filename)
                .then(() => Dialog.success("Removed"))
        }
    }

    return (
        <div className="storage">
            <h3 className="title">Assets</h3>
            <Pagination
                fetchMethod="getAllAssets"
                renderChildren={({ data, isLoading }) => {
                    const assets = isLoading ? Array(5).fill() : data

                    return (
                        <table>
                            <thead>
                                <tr>
                                    <th>Preview</th>
                                    <th>Filename</th>
                                    <th>Uploaded by</th>
                                    <th>Type</th>
                                    <th>Metadata</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {assets.map((asset, i) => (
                                    <tr key={asset?.id || i}>

                                        <td className="preview">
                                            {isLoading ? <Skeleton/> : <img src={asset.url} alt="preview" />}
                                        </td>

                                        <td>
                                            {isLoading ? <Skeleton/> : asset.filename}
                                        </td>

                                        <td>
                                            {isLoading ? <Skeleton/> : asset.user.full_name}
                                        </td>

                                        <td>
                                            {isLoading ? <Skeleton/> : asset.type}
                                        </td>

                                        <td>
                                            {isLoading ? <Skeleton/> : (
                                                <textarea value={JSON.stringify(asset.meta)} readOnly/>
                                            )}
                                        </td>

                                        <td>
                                            {isLoading ? <Skeleton circle width={30} height={30}/> : (
                                                <DeleteIcon className="icon" onClick={handleRemove.bind(null, asset)}/>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }}
            />
        </div>
    )
}

export default Storage
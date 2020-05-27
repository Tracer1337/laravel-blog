import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import Dialog from "../Dialog/Dialog.js"
import Icon from "../Icon.js"
import FileInput from "../FileInput.js"

import * as APIMethods from "../../config/API.js"
import getAPIData from "../../utils/useAPIData.js"
import objectToForm from "../../utils/objectToForm.js"

const Item = ({ element, onRemove, onSave, generateLink, withCover }) => {
    const [editNameValue, setEditNameValue] = useState("")
    const [uploadedCover, setUploadedCover] = useState()

    const handleNameChange = event => {
        setEditNameValue(event.target.value)
    }

    const handleCoverChange = (value) => {
        setUploadedCover(value)
    }

    useEffect(() => {
        if(element?.name && !name) {
            setEditNameValue(element.name)
        }
    }, [element?.name])

    return (
        <tr>
            <td>
                {element ? (
                    <input type="text" value={editNameValue} onChange={handleNameChange} placeholder="Name" />
                ) : <Skeleton />}
            </td>

            {withCover && (
                <td className="cover-wrapper">
                    {element ? (
                        element.cover.url ? (
                            <img src={element.cover.url} className="cover" alt="cover"/>
                        ) : <em>No cover available</em>
                    ) : <Skeleton/>}
                </td>
            )}

            <td>
                {element ? element.blogposts_count : <Skeleton />}
            </td>

            <td className="actions">
                {element ? (
                    <>
                        <Icon type="delete" className="icon" onClick={onRemove.bind(null, element.id, element.name)} />
                        <Icon type="save" className="icon" onClick={onSave.bind(null, element.id, { name: editNameValue, cover: uploadedCover })} />
                        <Link to={generateLink(element.id)} className="icon">
                            <Icon type="link" />
                        </Link>
                        {withCover && <FileInput icon="add-a-photo-alternate" accept="image/*" onChange={handleCoverChange} />}
                    </>
                ) : <Skeleton circle width={30} height={30} />}
            </td>
        </tr>
    )
}

const SharedControls = ({ methods, label, generateLink, withCover }) => {
    const [data, refresh] = getAPIData({
        method: methods.get,
        args: [true],
        cache: false
    })

    const [addValue, setAddValue] = useState("")

    const handleRemove = async (id, name) => {
        const shouldRemove = await Dialog.verify(`"${name}" will be deleted`)
        if (shouldRemove) {
            APIMethods[methods.delete](id).then(refresh)
        }
    }

    const handleSave = async (id, args) => {
        const values = { ...args, id }
        const formData = objectToForm(values)

        APIMethods[methods.edit](formData).then(refresh)
    }

    const handleAddChange = event => {
        setAddValue(event.target.value)
    }

    const handleAdd = () => {
        const args = { name: addValue }
        APIMethods[methods.add](args)
            .then(() => {
                setAddValue("")
                refresh()
            })
    }

    const elements = data ? data.data : Array(5).fill()

    return (
        <div>
            <div className="card">
                <input type="text" value={addValue} onChange={handleAddChange} placeholder={"Add " + label} />
                <Icon type="add" className="icon" onClick={handleAdd} />
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        {withCover && <th>Cover</th>}
                        <th>Posts Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {elements.map((element, i) => (
                        <Item
                            element={element}
                            generateLink={generateLink}
                            withCover={withCover}
                            key={i}
                            onRemove={handleRemove}
                            onSave={handleSave}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default SharedControls
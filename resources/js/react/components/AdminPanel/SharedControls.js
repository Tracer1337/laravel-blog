import React, { useState } from "react"
import { Link } from "react-router-dom"
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"

import Dialog from "../Dialog/Dialog.js"
import LoadingIndicator from "../LoadingIndicator.js"

import * as APIMethods from "../../config/API.js"
import getAPIData from "../../utils/useAPIData.js"

const SharedControls = ({ methods, label, generateLink }) => {
    const [data, refresh] = getAPIData(methods.get)

    const [addValue, setAddValue] = useState("")

    const handleRemove = async (name, id) => {
        const shouldRemove = await Dialog.verify(`"${name}" will be deleted`)
        if (shouldRemove) {
            APIMethods[methods.delete](id).then(refresh)
        }
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

    if (!data) {
        return <LoadingIndicator center/>
    }

    return (
        <div>
            <div className="card">
                <input type="text" value={addValue} onChange={handleAddChange} placeholder={"Add " + label} />
                <AddIcon className="icon" onClick={handleAdd} />
            </div>

            <hr/>

            {data.data.map(({ name, id }) => (
                <div className="card" key={id}>
                    <Link to={generateLink(id)} className="wrapper-link">
                        <div>{name}</div>
                    </Link>

                    <DeleteIcon className="icon" onClick={handleRemove.bind(null, name, id)} />
                </div>
            ))}
        </div>
    )
}
export default SharedControls
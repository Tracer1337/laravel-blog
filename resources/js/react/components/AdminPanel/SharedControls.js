import React, { useState } from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import Dialog from "../Dialog/Dialog.js"
import Icon from "../Icon.js"

import * as APIMethods from "../../config/API.js"
import getAPIData from "../../utils/useAPIData.js"

const SharedControls = ({ methods, label, generateLink }) => {
    const [data, refresh] = getAPIData({
        method: methods.get,
        args: [true],
        cache: false
    })

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
                        <th>Posts Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {elements.map((element, i) => (
                        <tr key={element?.id || i}>
                            <td>
                                <Link to={generateLink(element?.id)} className="wrapper-link">
                                    <div>{element ? element.name : <Skeleton/>}</div>
                                </Link>
                            </td>

                            <td>
                                {element ? element.blogposts_count : <Skeleton/>}
                            </td>

                            <td>
                                {element ? (
                                    <Icon type="delete" className="icon" onClick={handleRemove.bind(null, element.name, element.id)} />
                                ) : <Skeleton circle width={30} height={30}/>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default SharedControls
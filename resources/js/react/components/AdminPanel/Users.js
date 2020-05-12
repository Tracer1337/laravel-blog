import React from "react"
import { Link } from "react-router-dom"
import DeleteIcon from "@material-ui/icons/Delete"

import Dialog from "../Dialog/Dialog.js"
import Date from "../Date.js"

import { deleteUser, assignRole } from "../../config/API.js"
import useAPIData from "../../utils/useAPIData.js"

const Users = () => {
    const [data, refresh] = useAPIData("getAllUsers", [], false)
    const [roles] = useAPIData("getRoles")

    const handleRemove = async user => {
        const shouldRemove = await Dialog.verify(`"${user.username}" will be removed`)

        if (shouldRemove) {
            deleteUser(user.id).then(refresh)
        }
    }

    const handleRoleChange = (user, event) => {
        const args = {
            user_id: user.id,
            role_id: event.target.value
        }

        assignRole(args).then(refresh)
    }

    if (!data) {
        return <></>
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>E-Mail</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {data.data.map(user => (
                    <tr key={user.id}>
                        <td>
                            <Link to={"/user/" + user.id} className="wrapper-link">
                                {user.username}
                            </Link>
                        </td>

                        <td>{user.email}</td>

                        <td>{user.first_name}</td>

                        <td>{user.last_name}</td>
                        
                        <td>
                            {roles && (
                                <select defaultValue={user.role.id} onChange={handleRoleChange.bind(null, user)}>
                                    {roles.map(({ name, id }) => (
                                        <option value={id} key={id}>{name}</option>
                                    ))}
                                </select>
                            )}
                        </td>

                        <td><Date timestamp={user.created_at}/></td>

                        <td><Date timestamp={user.updated_at}/></td>

                        <td>
                            <DeleteIcon className="icon" onClick={handleRemove.bind(null, user)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Users
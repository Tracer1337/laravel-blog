import React from "react"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

import Dialog from "../Dialog/Dialog.js"
import Date from "../Date.js"
import Icon from "../Icon.js"

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

    const users = data ? data.data : Array(5).fill({})

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
                {users.map((user, i) => (
                    <tr key={user.id || i}>
                        <td>
                            <Link to={!data ? "" : "/user/" + user.id} className="wrapper-link">
                                {user.username || <Skeleton/>}
                            </Link>
                        </td>

                        <td>{user.email || <Skeleton width={200}/>}</td>

                        <td>{!data ? <Skeleton/> : user.first_name}</td>

                        <td>{!data ? <Skeleton/> : user.last_name}</td>
                        
                        <td>
                            {data && roles ? (
                                <select defaultValue={user.role.id} onChange={handleRoleChange.bind(null, user)}>
                                    {roles.map(({ name, id }) => (
                                        <option value={id} key={id}>{name}</option>
                                    ))}
                                </select>
                            ) : <Skeleton/>}
                        </td>

                        <td>{!data ? <Skeleton/> : <Date timestamp={user.created_at}/>}</td>

                        <td>{!data ? <Skeleton/> : <Date timestamp={user.updated_at} />}</td>

                        <td>
                            {!data ? <Skeleton circle width={30} height={30}/> : (
                                <Icon type="delete" className="icon" onClick={handleRemove.bind(null, user)} />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Users
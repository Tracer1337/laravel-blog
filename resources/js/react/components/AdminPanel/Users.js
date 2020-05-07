import React from "react"

import { Single } from "./SharedControls.js"

import { getAllUsers, deleteUser } from "../../config/API.js"

const Users = () => (
    <Single
        label="Users"
        labelKey="username"
        routePrefix="/user/"
        methods={{
            getAll: getAllUsers,
            delete: deleteUser
        }}
    />
)

export default Users
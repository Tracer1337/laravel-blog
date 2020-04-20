import React from "react"
import { Alert } from "@material-ui/lab"

const Error = ({ value }) => {
    return (
        <Alert severity="error">{value}</Alert>
    )
}

export default Error
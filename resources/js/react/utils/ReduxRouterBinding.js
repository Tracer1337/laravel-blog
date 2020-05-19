import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { connect } from "react-redux"

import { locationChange } from "../redux/actions.js"

const ReduxRouterBinding = ({ locationChange }) => {
    const location = useLocation()

    useEffect(() => {
        locationChange()
    }, [location])
    
    return null
}

export default connect(null, { locationChange })(ReduxRouterBinding)
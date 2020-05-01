import { connect } from "react-redux"

const Auth = ({ children, isLoggedIn, profile, role, roles }) => {
    if(!isLoggedIn) {
        return null
    }

    // Admins can access everything
    if(profile.role === "admin") {
        return children
    }

    // Single role via role = "..."
    if(role && profile.role !== role) {
        return null
    }

    // Multiple roles via roles = ["...", ...]
    if(roles && !roles.includes(profile.role)) {
        return null
    }

    return children
}

const mapStateToProps = store => ({
    isLoggedIn: store.auth.isLoggedIn,
    profile: store.auth.profile
})

export default connect(mapStateToProps)(Auth)
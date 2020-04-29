import React from "react"
import { connect } from "react-redux"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"

const Avatar = ({ avatar_url, onClick = () => null }) => avatar_url ? (
    <img src={avatar_url} alt="avatar" className="avatar" onClick={onClick}/>
) : (
    <AccountCircleIcon className="avatar" onClick={onClick}/>
)

const mapStateToProps = store => ({
    avatar_url: store.auth.profile.avatar_url
})

export default connect(mapStateToProps)(Avatar)
import React from "react"
import { connect } from "react-redux"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"

const defaultSize = 48

const Avatar = ({ 
    avatar_url, 
    onClick = () => null, 
    size = defaultSize
}) => avatar_url ? (
    <img 
        src={avatar_url} 
        alt="avatar" 
        className="avatar" 
        onClick={onClick} 
        style={{
            width: size+"px", 
            height: size+"px"
        }}
    />
) : (
    <AccountCircleIcon 
        className="avatar"
        onClick={onClick}
        style={{
            fontSize: size
        }}
    />
)

const mapStateToProps = store => ({
    avatar_url: store.auth.profile.avatar_url
})

export default connect(mapStateToProps)(Avatar)
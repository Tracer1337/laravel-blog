import React from "react"
import { connect } from "react-redux"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import Skeleton from "react-loading-skeleton"

const defaultSize = 48

const Avatar = ({ 
    avatar_url, 
    onClick = () => null, 
    size = defaultSize,
    user,
    showSkeleton
}) => {
    if(showSkeleton) {
        return (
            <div className="avatar">
                <Skeleton circle width={size} height={size}/>
            </div>
        )
    }

    const img_src = user ? user.avatar_url : avatar_url

    if(img_src) {
        return (
            <img
                src={avatar_url}
                alt="avatar"
                className="avatar"
                onClick={onClick}
                style={{
                    width: size + "px",
                    height: size + "px"
                }}
            />
        )
    }

    return (
        <AccountCircleIcon
            className="avatar"
            onClick={onClick}
            style={{
                fontSize: size
            }}
        />
    )
}

const mapStateToProps = store => ({
    avatar_url: store.auth.profile.avatar_url
})

export default connect(mapStateToProps)(Avatar)
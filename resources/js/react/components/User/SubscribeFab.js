import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import Fab from "../Fab.js"
import Auth from "../Auth.js"

import { followUser, unfollowUser, followsUser } from "../../config/API.js"

const SubscribeFab = ({ userId, profileId }) => {
    if(userId == profileId) {
        return null
    }

    const [hasSubscribed, setHasSubscribed] = useState()
    
    const checkSubscription = () => {
        followsUser(userId)
            .then(res => setHasSubscribed(res.data))
    }

    const handleClick = async () => {
        if(hasSubscribed) {
            await unfollowUser(userId)
        } else {
            await followUser(userId)
        }

        checkSubscription()
    }

    useEffect(() => {
        checkSubscription()
    }, [])

    if(typeof hasSubscribed === "undefined") {
        return <></>
    }

    return (
        <Auth>
            <Fab onClick={handleClick}>
                {hasSubscribed ? "Unsubscribe" : "Subscribe"}
            </Fab>
        </Auth>
    )
}

const mapStateToProps = store => ({
    profileId: store.auth.profile.id
})

export default connect(mapStateToProps)(SubscribeFab)
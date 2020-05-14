import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import Fab from "../Fab.js"
import Auth from "../Auth.js"
import LoadingIndicator from "../LoadingIndicator.js"

import { followUser, unfollowUser, followsUser } from "../../config/API.js"

const SubscribeFab = ({ userId, profileId }) => {
    if(userId == profileId) {
        return null
    }

    const [hasSubscribed, setHasSubscribed] = useState()
    const [isLoading, setIsLoading] = useState(false)
    
    const checkSubscription = async () => {
        const res = await followsUser(userId)
        setHasSubscribed(res.data)
        return
    }

    const handleClick = async () => {
        setIsLoading(true)

        if(hasSubscribed) {
            await unfollowUser(userId)
        } else {
            await followUser(userId)
        }

        await checkSubscription()
        setIsLoading(false)
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
                {isLoading ? <LoadingIndicator/> : (
                    hasSubscribed ? "Unsubscribe": "Subscribe"
                )}
            </Fab>
        </Auth>
    )
}

const mapStateToProps = store => ({
    profileId: store.auth.profile.id
})

export default connect(mapStateToProps)(SubscribeFab)
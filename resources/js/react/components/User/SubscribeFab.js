import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import Fab from "../Fab.js"
import Auth from "../Auth.js"
import LoadingIndicator from "../LoadingIndicator.js"

import { followUser, unfollowUser, followsUser } from "../../config/API.js"
import { gaEvent } from "../../utils/GATracking.js"

const SubscribeFab = ({ username, profileName }) => {
    if(username == profileName) {
        return null
    }

    const [hasSubscribed, setHasSubscribed] = useState()
    const [isLoading, setIsLoading] = useState(false)
    
    const checkSubscription = async () => {
        const res = await followsUser(username)
        setHasSubscribed(res.data)
        return
    }

    const handleClick = async () => {
        if(isLoading) {
            return
        }

        setIsLoading(true)

        if(hasSubscribed) {
            gaEvent({
                category: "User",
                action: "Unfollow"
            })
            
            await unfollowUser(username)
        } else {
            gaEvent({
                category: "User",
                action: "Follow"
            })
            
            await followUser(username)
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
    profileName: store.auth.profile.username
})

export default connect(mapStateToProps)(SubscribeFab)
import React, { useState, useEffect } from "react"
import { useParams, useLocation, Link } from "react-router-dom"

import { getUser, followUser, followsUser, unfollowUser } from "../config/API.js"

const UserPage = ({ profile }) => {
    const { id } = useParams()
    const location = useLocation()

    const isProfilePage = profile?.id == id
    
    const [user, setUser] = useState(null)
    const [follows, setFollows] = useState(false)

    const fetchUser = () => {
        getUser(id).then(res => setUser(res.data.data))
    }

    const handleFollow = () => {
        followUser(id).then(() => {
            setFollows(true)            
            fetchUser()
        })
    }

    const handleUnfollow = () => {
        unfollowUser(id).then(() => {
            setFollows(false)
            fetchUser()
        })
    }

    useEffect(() => {
        fetchUser()
        followsUser(id).then(res => setFollows(res.data))
    }, [location])

    
    if(!user) {
        return (
            <div className="w-100 d-flex justify-content-center">
                <div className="spinner-border text-primary"/>
            </div>
        )
    }

    return (
        <div className="container my-4">
            {isProfilePage ? (
                <Link to="/edit-profile" className="btn btn-outline-primary">Edit this page</Link>
            ) : null}

            <div className="my-4" style={{
                display: "grid",
                gridTemplate: "80px 20px / 1fr 100px"
            }}>
                <h3>Username: {user.username}</h3>
                <img src={`${window.location.origin}/${user.avatar_url}`} className="rounded" style={{ 
                    height: 100,
                    gridArea: "1 / 2 / 3 / 3",
                }}/>
                <p>Followers: {user.followersCount}</p>
            </div>

            {!isProfilePage ? (
                follows ? (
                    <button className="btn btn-primary" onClick={handleUnfollow}>
                        Unfollow
                    </button>    
                ) : (
                    <button className="btn btn-primary" onClick={handleFollow}>
                        Follow
                    </button>
                )
            ) : null}

            <hr className="my-4"/>

            <h4>Recommendations:</h4>

            {user.recommendations.map(recommendation => (
                <Link to={"/blogpost/"+recommendation.id} key={recommendation.id}>{recommendation.title}</Link>
            ))}
        </div>
    )
}

export default UserPage
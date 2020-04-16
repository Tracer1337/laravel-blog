import React, { useState, useEffect } from "react"
import { useParams, useLocation, Link } from "react-router-dom"

import { getUser, followUser, followsUser, unfollowUser, removeRecommendation } from "../config/API.js"

const UserPage = ({ profile }) => {
    const { id } = useParams()
    const location = useLocation()

    const isProfilePage = profile?.id == id
    
    const [user, setUser] = useState(null)
    const [follows, setFollows] = useState(false)

    const fetchUser = () => {
        getUser(id).then(res => {
            res.data.data.links = JSON.parse(res.data.data.links)
            setUser(res.data.data)
        })
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

    const handleRemoveRecommendation = id => {
        removeRecommendation(id).then(fetchUser)
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
                <>
                    <Link to="/edit-profile" className="btn btn-outline-primary mr-2">Edit profile</Link>
                    <Link to="/my-blogposts" className="btn btn-outline-primary mr-2">My Posts</Link>
                </>
            ) : null}

            <div className="my-4" style={{
                display: "grid",
                gridTemplate: "80px 20px / 1fr 100px"
            }}>
                <h3>Username: {user.username}</h3>
                <img src={user.avatar_url} className="rounded" style={{ 
                    height: 100,
                    gridArea: "1 / 2 / 3 / 3",
                }}/>
                <p>Followers: {user.followersCount}</p>
                
                <div className="mt-4">
                    {user.links?.github && <a href={user.links.github} target="_blank" className="mr-2">Github</a>}
                    {user.links?.website && <a href={user.links.website} target="_blank" className="mr-2">Website</a>}
                </div>
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

            {user.biography ? (
                <>
                    <h4>Biography</h4>
                    {user.biography}
                    <hr className="my-4" />
                </>
            ) : null}

            <h4>Recommendations:</h4>

            {user.recommendations.map(recommendation => (
                <div className="border border-grey rounded d-flex justify-content-between p-2 my-2">
                    <Link to={"/blogpost/"+recommendation.id} key={recommendation.id}>{recommendation.title}</Link>
                    {user.id === profile.id && <button className="btn btn-danger d-inline" onClick={() => handleRemoveRecommendation(recommendation.id)}>Remove</button>}
                </div>
            ))}
        </div>
    )
}

export default UserPage
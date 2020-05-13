import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"

import Head from "../components/User/Head.js"
import Information from "../components/User/Information.js"
import Links from "../components/User/Links.js"
import Biography from "../components/User/Biography.js"
import Recommendations from "../components/User/Recommendations.js"
import SubscribeFab from "../components/User/SubscribeFab.js"

import useAPIData from "../utils/useAPIData.js"
import pageTitle from "../config/pageTitle.js"

const User = () => {
    const { id } = useParams()

    const [data] = useAPIData("getUser", [id])

    const user = data ? data.data : {}

    return (
        <div className="user-page">
            <Helmet>
                <title>{pageTitle(user.username)}</title>
                <meta name="description" content={user.biography}/>
            </Helmet>
            
            <main>
                <Head data={user}/>

                <div className="spacer"/>

                <div className="information-links-wrapper">
                    <Information data={user}/>

                    <Links data={user}/>
                </div>

                <div className="spacer"/>

                <Biography data={user}/>

                <div className="spacer"/>
            </main>

            {user.recommendations?.length > 0 && (
                <>
                    <Recommendations data={user} />

                    <div className="spacer"/>
                </>
            )}

            <SubscribeFab userId={id}/>
        </div>
    )
}

export default User
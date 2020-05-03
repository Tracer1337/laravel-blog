import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import Head from "../components/User/Head.js"
import Information from "../components/User/Information.js"
import Biography from "../components/User/Biography.js"
import Recommendations from "../components/User/Recommendations.js"

import { getUser } from "../config/API.js"

const User = () => {
    const { id } = useParams()

    const [data, setData] = useState()

    useEffect(() => {
        getUser(id).then(res => setData(res.data.data))
    }, [id])

    if(!data) {
        return <></>
    }

    return (
        <div className="user">
            <main>
                <Head data={data}/>

                <div className="spacer"/>

                <Information data={data}/>

                <div className="spacer"/>

                <Biography data={data}/>

                <div className="spacer"/>
            </main>

            {data.recommendations.length > 0 && (
                <>
                    <Recommendations data={data} />

                    <div className="spacer"/>
                </>
            )}
        </div>
    )
}

export default User
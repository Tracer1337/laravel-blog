import React from "react"

import HorizontalScrollablePosts from "../HorizontalScrollablePosts.js"

const Recommendations = ({ data }) => {
    return (
        <div className="recommendations">
            <main>
                <h3 className="title">Recommendations</h3>
            </main>

            <HorizontalScrollablePosts posts={data.recommendations}/>
        </div>
    )
}

export default Recommendations
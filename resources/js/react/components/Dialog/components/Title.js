import React from "react"

function Title({ value }) {
    return (
        <>
            <h3 className="title">
                {value}
            </h3>

            <hr/>
        </>
    )
}

export default Title
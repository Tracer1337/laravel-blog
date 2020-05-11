import React from "react"

const styles = {
    subtitle: {
        opacity: .9,
        margin: "15px 0 15px 15px"
    }
}

function Subtitle({ value }) {
    return (
        <h6 className="subtitle">
            {value}
        </h6>
    )
}

export default Subtitle
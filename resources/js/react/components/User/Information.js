import React from "react"
import Skeleton from "react-loading-skeleton"

const Head = ({ data }) => {
    console.log(data)

    if(data.available_statistics) {
        console.log(data.available_statistics)
        console.log(Object.entries(data.available_statistics))
    }

    return (
        <div className="information">
            <ul className="statistics">
                {!data.available_statistics ? (
                    <Skeleton height={35} width={250} count={5}/>
                ) : (
                    Object.entries(data.available_statistics).map(([label, selector], i) => (
                        <li key={i}>
                            <span className="name">{label}</span>
                            <span className="value">{!data.username ? <Skeleton width={50} /> : data[selector]}</span>
                        </li>
                    )
                ))}
            </ul>
        </div>
    )
}

export default Head
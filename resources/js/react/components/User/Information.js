import React from "react"

const entries = [
    {
        label: "Subscriber",
        selector: "subscriberCount"
    },
    {
        label: "Subscribed",
        selector: "subscriptionCount"
    },
    {
        label: "Posts",
        selector: "blogpostCount"
    },
    {
        label: "Comments",
        selector: "commentCount"
    },
    {
        label: "Likes Recieved",
        selector: "likesRecieved"
    }
]

const Head = ({ data }) => (
    <div className="information">
        <ul className="statistics">
            {entries.map(({ label, selector }, i) => (
                <li key={i}>
                    <span className="name">{label}</span>
                    <span className="value">{data[selector]}</span>
                </li>
            ))}
        </ul>
    </div>
)

export default Head
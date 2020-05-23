import React from "react"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"

const Head = ({ data, availableStatistics }) => (
    <div className="information">
        <ul className="statistics">
            {Object.entries(availableStatistics).map(([label, selector], i) => (
                <li key={i}>
                    <span className="name">{label}</span>
                    <span className="value">{!data.username ? <Skeleton width={50} /> : data[selector]}</span>
                </li>
            ))}
        </ul>
    </div>
)

const mapStateToProps = store => ({
    availableStatistics: store.serverConfig.available_user_statistics
})

export default connect(mapStateToProps)(Head)
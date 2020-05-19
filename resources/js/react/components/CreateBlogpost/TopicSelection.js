import React, { useMemo } from "react"
import { Controller } from  "react-hook-form"
import Select from "react-select"

import useAPIData from "../../utils/useAPIData.js"

const TopicSelection = (props) => {
    const defaultValue = props.defaultValue ? {
        label: props.defaultValue.name,
        value: props.defaultValue.id
    } : null

    const [data] = useAPIData({
        method: "getAllTopics"
    })

    const topics = data?.data

    const topicsOptions = useMemo(() => {
        return topics?.map(({ name, id }) => ({
            label: name,
            value: id
        }))
    }, [data])

    if (!data) {
        return <></>
    }

    return (
        <div>
            <label>Topic</label>

            <Controller
                as={Select}
                name="topic_id"
                control={props.control}
                defaultValue={defaultValue}
                options={topicsOptions}
                className="select-container"
                classNamePrefix="select"
                placeholder="Select A Topic"
            />
        </div>
    )
}

export default TopicSelection
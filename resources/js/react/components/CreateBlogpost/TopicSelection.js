import React, { useState, useMemo, useEffect } from "react"
import { Controller } from  "react-hook-form"
import Select from "react-select"

import { getAllTopics } from "../../config/API.js"

const TopicSelection = (props) => {
    const defaultValue = props.defaultValue ? {
        label: props.defaultValue.name,
        value: props.defaultValue.id
    } : null

    const [topics, setTopics] = useState()

    const topicsOptions = useMemo(() => {
        return topics?.map(({ name, id }) => ({
            label: name,
            value: id
        }))
    }, [topics])

    useEffect(() => {
        getAllTopics()
            .then(res => setTopics(res.data.data))
    }, [])

    if(!topics) {
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
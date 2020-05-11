import React, { useState, useEffect, useMemo } from "react"
import { Controller } from "react-hook-form"
import Select from "react-select"

import useAPIData from "../../utils/useAPIData.js"

const TagSelection = (props) => {
    const defaultValue = useMemo(() => {
        if(!props.defaultValue) {
            return null
        }

        const values = []

        for(let tag of props.defaultValue) {
            values.push({ label: tag.name, value: tag.id })
        }

        return values
    }, [props.defaultValue])

    const [data] = useAPIData("getAllTags")
    
    const tags = data?.data

    const tagsOptions = useMemo(() => {
        return tags?.map(({ name, id }) => ({
            label: name,
            value: id
        }))
    }, [data])

    if(!data) {
        return <></>
    }

    return (
        <div>
            <label>Tags</label>

            <Controller
                as={Select}
                control={props.control}
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                isMulti
                options={tagsOptions}
                name="tag_ids"
                className="select-container"
                classNamePrefix="select"
                placeholder="Add Tags"
            />
        </div>
    )
}

export default TagSelection
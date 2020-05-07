import React, { useState, useEffect } from "react"
import Select from "react-select"

const Dropdown = ({ placeholder, getMethod, Option, labelKey }) => {
    const [data, setData] = useState()

    const fetchData = () => {
        getMethod()
            .then(res => {
                const newData = res.data.data.map(obj => ({
                    label: obj[labelKey],
                    value: obj.id
                }))
                setData(newData)
            })
    }

    useEffect(fetchData, [])

    if (!data) {
        return <></>
    }

    return (
        <Select
            placeholder={placeholder}
            options={data}
            className="select-container bottom"
            classNamePrefix="select"
            value={null}
            closeMenuOnSelect={false}
            components={Option ? {
                Option: props => (
                    <Option
                        {...props}
                        onAction={fetchData}
                    />
                )
            } : null}
        />
    )
}

export default Dropdown
import React, { useState } from "react"
import Select from "react-select"

const Dropdown = ({ placeholder, getMethod, Option, labelKey, cacheOptions }) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = () => {
        if(cacheOptions && data) {
            return
        }

        setIsLoading(true)

        getMethod()
            .then(res => {
                const newData = res.data.data.map(obj => ({
                    label: obj[labelKey],
                    value: obj.id
                }))
                setData(newData)
                setIsLoading(false)
            })
    }

    return (
        <Select
            options={data}
            isLoading={isLoading}
            onMenuOpen={fetchData}
        
            placeholder={placeholder}
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
import React, { useState } from "react"
import { Select as MuiSelect, InputLabel, FormControl, MenuItem } from "@material-ui/core"

let idCounter = 0
const useId = () => {
    const [id] = useState(idCounter++)
    return id
}

function Select({ label, options, onChange, value }) {
    const labelId = useId()

    const handleChange = event => {
        onChange(event.target.value)
    }

    return (
        <FormControl fullWidth>
            {label && 
                <InputLabel id={labelId}>{label}</InputLabel>
            }

            <MuiSelect 
                value={value} 
                onChange={handleChange}
                labelId={labelId}
            >
                {options.map(({value, label, style}, i) => (
                    <MenuItem value={value} key={i} style={style}>{label}</MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    )
}

export default Select
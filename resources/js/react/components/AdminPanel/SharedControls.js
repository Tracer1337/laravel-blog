import React from "react"

import AddField from "../AddField.js"
import Dropdown from "../Dropdown.js"
import CustomOption from "../CustomOption.js"

const Single = ({ methods, label, routePrefix, labelKey }) => (
    <div className="control">
        <Dropdown getMethod={methods.getAll} labelKey={labelKey} placeholder={"All " + label} Option={props => (
            <CustomOption
                methods={methods}
                linkTo={routePrefix + props.data.value}
                {...props}
            />
        )} />
    </div>
)

const Multi = ({ methods, label }) => {
    return (
        <div className="control melt-inputs">
            <AddField submitTo={methods.add} placeholder={label + " ..."} />

            <Dropdown getMethod={methods.getAll} labelKey="name" placeholder={"All "+label} Option={props => (
                <CustomOption methods={methods} {...props}/>
            )}/>
        </div>
    )
}

export {
    Single,
    Multi
}
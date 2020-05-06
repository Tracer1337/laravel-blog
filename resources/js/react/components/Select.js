import React from "react"
import ChevronIcon from "@material-ui/icons/ChevronRight"

const Select = ({ forwardRef, children, ...props }) => {
    return (
        <div className="select-wrapper">
            <select className="input" ref={forwardRef} {...props}>
                {children}
            </select>
            <ChevronIcon className="arrow"/>
        </div>
    )
}

export default React.forwardRef((props, ref) => <Select forwardRef={ref} {...props}/>)
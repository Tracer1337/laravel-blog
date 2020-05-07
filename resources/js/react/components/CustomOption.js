import React from "react"
import { useHistory } from "react-router-dom"
import { css } from "emotion"
import DeleteIcon from "@material-ui/icons/Delete"

import Dialog from "./Dialog/Dialog.js"

const CustomOption = ({ methods = {}, onAction, cx, getStyles, innerProps, linkTo, ...props }) => {
    const history = useHistory()

    const handleClick = () => {
        if(linkTo) {
            history.push(linkTo)
        }
    }
    
    const handleDelete = async () => {
        const shouldDelete = await Dialog.verify(`"${props.data.label}" will be deleted`)

        if (shouldDelete) {
            methods.delete(props.data.value)
                .then(() => onAction())
        }
    }

    return (
        <div {...innerProps} style={{ cursor: linkTo ? "pointer" : null }} className={cx({
            [css(getStyles("option", props))]: true,
            "option": true,
            "option--is-focused": props.isFocused
        })}>
            <div onClick={handleClick}>
                {props.data.label}
            </div>

            {methods.delete && (
                <div>
                    <DeleteIcon onClick={handleDelete} className="icon" style={{ fontSize: 20 }} />
                </div>
            )}
        </div>
    )
}

export default CustomOption
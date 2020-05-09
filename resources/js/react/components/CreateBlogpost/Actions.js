import React from "react"
import SaveIcon from "@material-ui/icons/Save"
import SendIcon from "@material-ui/icons/Send"

const Actions = ({ onSubmit, editData }) => {
    return (
        <div className="actions">
            <button className="submit" onClick={() => onSubmit(0)}>
                <SaveIcon className="icon" />
                <span>Save</span>
            </button>

            <button className="submit" onClick={() => onSubmit(1)} disabled={!!editData?.published_at}>
                <SendIcon className="icon" />
                <span>Publish</span>
            </button>
        </div>
    )
}

export default Actions
import React from "react"
import AddIcon from "@material-ui/icons/Add"
import { useForm } from "react-hook-form"

const AddField = ({ submitTo, placeholder }) => {
    const { register, getValues, setValue } = useForm()

    const handleAdd = () => {
        const name = getValues("name")
        submitTo({ name })
            .then(() => setValue("name", ""))
    }

    return (
        <div className="add-topic top">
            <input type="text" placeholder={placeholder} name="name" ref={register()} />

            <div className="action">
                <AddIcon onClick={handleAdd} className="icon" />
            </div>
        </div>
    )
}

export default AddField
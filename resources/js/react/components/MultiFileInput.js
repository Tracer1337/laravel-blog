import React, { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import AddIcon from "@material-ui/icons/Add"
import CloseIcon from "@material-ui/icons/Close"

import FileInput from "./FileInput.js"

const MultiFileInput = ({ useHooks, onChange, name, ...props }) => {
    const formHooks = useFormContext()

    const [inputs, setInputs] = useState([])
    const [files, setFiles] = useState({})
    const [idCounter, setIdCounter] = useState(0)

    const submitChange = newFiles => {
        setFiles(newFiles)
        onChange?.(newFiles)

        if (useHooks) {
            formHooks.setValue(name, Object.values(files))
        }
    }

    const handleRemove = id => {
        const newInputs = inputs.filter(e => e.id !== id)
        delete files[id]

        setInputs(newInputs)
        submitChange(files)
    }

    const handleChange = (file, id) => {
        files[id] = file
        submitChange(files)
    }

    const addInput = () => {
        setInputs([...inputs, {
            element: <FileInput onChange={handleChange} name={idCounter} className="multi" {...props} />,
            id: idCounter
        }])

        setIdCounter(idCounter + 1)
    }

    useEffect(() => {
        addInput()

        if(useHooks) {
            formHooks.register({ name })
        }
    }, [])

    return (
        <div className="multi-file-input">
            {inputs.map(({ element, id }) => (
                <div className="input-wrapper" key={id}>
                    {element}    
                    <CloseIcon className="icon" onClick={() => handleRemove(id)}/>
                </div>
            ))}
            <AddIcon onClick={addInput} className="icon"/>
        </div>
    )
}

export default MultiFileInput
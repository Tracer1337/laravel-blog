import React, { useMemo } from "react"
import ReactDOM from "react-dom"
import { useForm } from "react-hook-form"

import store from "../../../redux/store.js"
import sizeOf from "../../../utils/sizeOf.js"
import { setSettings } from "../../../redux/actions.js"

// Map anonymous names to key since useForm converts dots to object
const nameKeyMap = {
    "name-1": "cache.lifetimeBeforeDiscarding"
}

const Settings = ({ onClose }) => {
    const state = store.getState()

    const { register, handleSubmit } = useForm({
        defaultValues: (function() {
            // Convert keys to anonymous
            const original = state.settings
            const formatted = {}
            
            const nameKeyMapEntries = Object.entries(nameKeyMap)

            for(let key in original) {
                const anonymousKey = nameKeyMapEntries.find(([anonymousKey, originalKey]) => originalKey === key)?.[0]

                if(anonymousKey) {
                    formatted[anonymousKey] = original[key]
                }
            }

            return formatted
        })()
    })

    const cacheSizeKB = useMemo(() => {
        const bytes = sizeOf(state.cache)
        return Math.round(bytes / 1000)
    }, [])

    const handleSave = (data) => {
        // Convert anonymous keys back to original
        const formatted = {}
        for(let key in data) {
            const originalKey = nameKeyMap[key]
            formatted[originalKey] = data[key]
        }

        formatted["cache.lifetimeBeforeDiscarding"] = parseInt(formatted["cache.lifetimeBeforeDiscarding"])

        store.dispatch(setSettings(formatted))
        onClose()
    }

    return (
        <div className="dialog">
            <div className="inner-dialog">
                <h3 className="title">Settings</h3>

                <form onSubmit={handleSubmit(handleSave)}>
                    <div>
                        <h4>Cache lifetime</h4>
                        <input type="number" min="0" max="20" name="name-1" ref={register()}/>
                    </div>

                    <div>
                        <h4>Cache Size (KB)</h4>
                        <p>{cacheSizeKB}</p>
                    </div>

                    <button>Save</button>
                </form>
            </div>
        </div>
    )
}

export default () => {
    const container = document.createElement("div")

    ReactDOM.render(
        ReactDOM.createPortal((
            <Settings onClose={() => ReactDOM.unmountComponentAtNode(container)} />
        ), document.getElementById("root"))
    , container)
}
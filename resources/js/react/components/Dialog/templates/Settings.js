import React, { useMemo } from "react"
import { useForm } from "react-hook-form"

import Dialog from "../Dialog.js"

import store from "../../../redux/store.js"
import sizeOf from "../../../utils/sizeOf.js"
import { setSettings } from "../../../redux/actions.js"
import renderInRoot from "../../../utils/renderInRoot.js"

// Map anonymous names to key since useForm converts dots to object
const nameKeyMap = {
    "name-1": "cache.enabled",
    "name-2": "cache.lifetimeBeforeDiscarding"
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
        <div className="dialog form-page">
            <div className="inner-dialog">
                <h3 className="title">Settings</h3>

                <hr/>

                <h3 className="subtitle">Cookies</h3>

                <button onClick={Dialog.cookiePreferences}>Open Cookie Preferences</button>

                <hr/>

                <h3 className="subtitle">Cache</h3>

                <form onSubmit={handleSubmit(handleSave)}>
                    <div className="checkbox">
                        <input type="checkbox" name="name-1" id="name-1" ref={register()} />
                        <label htmlFor="name-1">Cache Enabled</label>
                    </div>

                    <div>
                        <label>Cache Lifetime</label>
                        <input type="number" min="0" max="20" name="name-2" className="input" ref={register()}/>
                    </div>

                    <div>
                        <label>Cache Size (KB)</label>
                        <p>{cacheSizeKB}</p>
                    </div>

                    <hr/>

                    <button>Save</button>
                </form>
            </div>
        </div>
    )
}

export default renderInRoot(Settings)
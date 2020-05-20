import React from "react"
import ReactDOM from "react-dom"
import { useForm } from "react-hook-form"

import store from "../../../redux/store.js"
import { setSettings } from "../../../redux/actions.js"

const CookiePreferences = () => {
    const container = document.createElement("div")

    const Modal = ({ onClose }) => {
        const { settings } = store.getState()

        const { register, getValues } = useForm({
            defaultValues: {
                tracking: typeof settings["cookies.tracking"] !== "undefined" ? settings["cookies.tracking"] : true
            }
        })

        const handleSave = () => {
            const newPreferences = {
                "cookies.tracking": getValues("tracking")
            }

            store.dispatch(setSettings(newPreferences))

            onClose()
        }

        return (
            <div className="dialog">
                <div className="inner-dialog">
                    <h3>Change Preferences</h3>

                    <div>
                        <input type="checkbox" ref={register} id="tracking" name="tracking" />
                        <label htmlFor="tracking">Tracking Cookies</label>
                    </div>

                    <p>You can change your preferences and decline certain types of cookies to be stored on your computer while browsing our website. You can also remove any cookies already stored on your computer, but keep in mind that deleting cookies may prevent you from using parts of our website.</p>
                    <p>Cookies are very small text files that are stored on your computer when you visit a website. We use cookies for a variety of purposes and to enhance your online experience on our website (for example, to remember your account login details).</p>
                    <p>You can change your preferences and decline certain types of cookies to be stored on your computer while browsing our website. You can also remove any cookies already stored on your computer, but keep in mind that deleting cookies may prevent you from using parts of our website.</p>

                    <div>
                        <div>Cookie Consent by</div>
                        <a href="https://www.freeprivacypolicy.com/free-cookie-consent/">FreePrivacyPolicy.com</a>
                    </div>

                    <div className="spacer-small" />

                    <button onClick={handleSave}>Save Preferences</button>
                </div>
            </div>
        )
    }
    
    return ReactDOM.render((
        ReactDOM.createPortal((
            <Modal onClose={() => ReactDOM.unmountComponentAtNode(container)}/>
        ), document.getElementById("root"))
    ), container)
}

export default CookiePreferences
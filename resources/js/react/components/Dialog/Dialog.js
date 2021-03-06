import React, { Component } from "react"
import ReactDOM from "react-dom"

import Textbox from "./components/Textbox.js"
import Title from "./components/Title.js"
import Subtitle from "./components/Subtitle.js"
import Button from "./components/Button.js"
import Caption from "./components/Caption.js"
import Error from "./components/Error.js"
import Success from "./components/Success.js"
import Collapsible from "./components/Collapsible.js"

import Verification from "./templates/Verification.js"
import ErrorTemplate from "./templates/Error.js"
import SuccessTemplate from "./templates/Success.js"
import CookieConsent from "./templates/CookieConsent.js"
import CookiePreferences from "./templates/CookiePreferences.js"
import Settings from "./templates/Settings.js"

class Dialog extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            fieldState: {}
        }

        for(let field of this.props.fields.filter(e => e)) {
            if(field.name) {
                this.state.fieldState[field.name] = field.defaultValue === undefined ? null : field.defaultValue
            }
        }
    }
    
    getField(field, index, style) {
        field.key = field.key || index
        let element

        switch(field.type) {
            case "textbox":
                element = <Textbox {...field}/>
                break

            case "title":
                element = <Title {...field}/>
                break

            case "subtitle":
                element = <Subtitle {...field}/>
                break

            case "button":
                element = <Button {...field}/>
                break

            case "submit":
                element = <Button {...field} onClick={this.handleSubmit.bind(this)}/>
                break
            
            case "caption":
                element = <Caption {...field}/>
                break

            case "element":
                element = React.createElement(field.value)
                break

            case "error":
                element = <Error {...field}/>
                break

            case "success":
                element = <Success {...field}/>
                break
            
            case "collapsible":
                element = <Collapsible {...field}/>
                break
                
            default:
                element = <p>Element type {field.type} not found</p>
                break
        }

        return (
            <div key={field.key} style={style} className="dialog-field">
                {element}
            </div>
        )
    }

    handleChange(name, value) {
        this.setState({
            fieldState: {
                ...this.state.fieldState,
                [name]: value
            }
        })
    }

    handleSubmit() {
        if(this.props.onSubmit) {
            this.props.onSubmit(this.state.fieldState)
        }
    }

    handleKeyPress(event) {
        // User pressed enter => Submit
        if(event.keyCode === 13 && this.props.onSubmit) {
            this.props.onSubmit(this.state.fieldState)
        }
    }

    componentDidMount() {
        document.body.style.overflow = "hidden"
    }

    componentWillUnmount() {
        document.body.style.overflow = null
    }

    render() {
        const fields = this.props.fields.filter(e => e).map((f, i) => this.getField(f, i))
        
        return ReactDOM.createPortal(
            <div onKeyDown={this.handleKeyPress.bind(this)} className="dialog">
                <div className="inner-dialog">
                    {fields}
                </div>
            </div>
        , document.getElementById("root"))
    }
}

Dialog.verify = Verification
Dialog.error = ErrorTemplate
Dialog.success = SuccessTemplate
Dialog.cookieConsent = CookieConsent
Dialog.cookiePreferences = CookiePreferences
Dialog.settings = Settings

export default Dialog
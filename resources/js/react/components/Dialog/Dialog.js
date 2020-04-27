import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Dialog as MuiDialog, Container, withStyles } from "@material-ui/core"
import clsx from "clsx"

import String from "./components/String.js"
import List from "./components/List.js"
import ListItem from "./components/ListItem.js"
import Textbox from "./components/Textbox.js"
import Title from "./components/Title.js"
import Subtitle from "./components/Subtitle.js"
import Button from "./components/Button.js"
import Functions from "./components/Functions.js"
import Select from "./components/Select.js"
import Warning from "./components/Warning.js"
import Caption from "./components/Caption.js"
import Error from "./components/Error.js"
import File from "./components/File.js"

import Verification from "./templates/Verification.js"
import WarningTemplate from "./templates/Warning.js"
import ErrorTemplate from "./templates/Error.js"
import Login from "./templates/Login.js"
import Register from "./templates/Register.js"

const styles = theme => ({
    outerDialog: {
        zIndex: theme.zIndex.drawer
    },

    innerDialog: {
        paddingBottom: 6
    }
})

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
            case "string":
                element = <String {...field} value={this.state.fieldState[field.name]} onChange={value => this.handleChange(field.name, value)}/>
                break
            
            case "list":
                element = <List {...field}>{field.items.map((f, i) => this.getField(f, index + i, {margin: 0}))}</List>
                break

            case "listItem":
                element = <ListItem {...field}/>
                break
            
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

            case "functions":
                element = <Functions {...field}/>
                break

            case "select":
                element = <Select {...field} value={this.state.fieldState[field.name]} onChange={value => this.handleChange(field.name, value)}/>
                break

            case "warning":
                element = <Warning {...field}/>
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

            case "file":
                element = <File {...field} onChange={value => this.handleChange(field.name, value)}/>
                break
            
            default:
                element = <p>Element type {field.type} not found</p>
                break
        }

        return (
            <div key={field.key} style={style} className={"dialog-field"}>
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

    render() {
        const { classes } = this.props

        const fields = this.props.fields.filter(e => e).map((f, i) => this.getField(f, i))

        if(this.props.fieldsOnly) {
            return <>{fields}</>
        }
        
        return ReactDOM.createPortal(
            <MuiDialog 
                className={clsx(classes.outerDialog)}
                open={true}
                onKeyDown={this.handleKeyPress.bind(this)}
                maxWidth="md"
                fullWidth
            >
                <Container className={classes.innerDialog}>
                    {fields}
                </Container>
            </MuiDialog>
        , document.getElementById("root"))
    }
}

Dialog.verify = Verification
Dialog.warn = WarningTemplate
Dialog.error = ErrorTemplate

Dialog.forms = {
    login: Login,
    register: Register
}

export default withStyles(styles)(Dialog)
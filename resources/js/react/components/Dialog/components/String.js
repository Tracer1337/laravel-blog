import React, { Component } from "react"

class String extends Component {
    constructor(props) {
        super(props)

        this.insert = this.insert.bind(this)
        this.set = this.set.bind(this)
    }
    
    insert(insertion){
        const inputField = this.textField.querySelector("input")
        const { value } = this.props
        let newValue

        if(!isNaN(inputField.selectionStart)) {
            newValue = value.substr(0, inputField.selectionStart) + insertion + value.substr(inputField.selectionEnd, value.length)    
        } else {
            newValue = value + insertion
        }

        this.handleChange({ target: { value: newValue } })
    }

    set(value){
        this.handleChange({target: {value}})
    }

    handleChange(event) {
        this.props.onChange(event.target.value)
    }

    render() {
        return(
            <input
                ref={ref => this.textField = ref}
                value={this.props.value}
                onChange={this.handleChange.bind(this)}
                placeholder={this.props.label}
                type={this.props.inputType || "text"}
                className="input"
            />
        )
    }
}

export default String
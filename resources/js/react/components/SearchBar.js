import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import SearchIcon from "@material-ui/icons/Search"

const SearchBar = () => {
    const history = useHistory()

    const [value, setValue] = useState("")
    const [focus, setFocus] = useState(false)

    const submit = () => {
        if(value) {
            history.push("/search?query=" + value)
        }
    }

    const handleChange = event => {
        setValue(event.target.value)
    }

    const handleClick = submit

    const handleKeyDown = (event) => {
        if(event.keyCode === 13) {
            submit()
        }
    }

    const handleFocus = () => setFocus(true)
    const handleBlur = () => setFocus(false)

    return (
        <div className={`search-bar ${focus ? "focus" : ""}`}>
            <input
                type="text"
                placeholder="Search..."
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
            <SearchIcon className="icon" onClick={handleClick}/>
        </div>
    )
}

export default SearchBar
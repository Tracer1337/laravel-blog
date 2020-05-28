import React, { useState } from "react"

const Collapsible = ({ label, value }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    if(!value) {
        return null
    }

    return (
        <div className="collapsible">
            <button className="label" onClick={handleClick}>{label}</button>

            {isOpen && (
                <pre>
                    <code>
                        {value}
                    </code>
                </pre>
            )}
        </div>
    )
}

export default Collapsible
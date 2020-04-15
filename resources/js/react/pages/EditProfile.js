import React, { useState, useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"
import { editProfile } from "../config/API"

const EditProfilePage = ({ profile }) => {
    const [formState, setFormState] = useState(profile)
    const avatarRef = useRef()
    const history = useHistory()

    const handleChange = event => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()

        const avatar = avatarRef.current.files[0]

        const formData = new FormData()
        for (let key in formState) {
            if(formState[key]) {
                formData.append(key, formState[key])
            }
        }

        if (avatar) {
            formData.append("avatar", avatar)
        }

        const links = {}
        for(let key of ["github", "website"]) {
            links[key] = formState[key]
        }
        formData.append("links", JSON.stringify(links))

        editProfile(formData).then(() => history.push("/user/"+profile.id))
    }

    useEffect(() => {
        const newFormState = {...formState}

        for(let key in profile.links) {
            newFormState[key] = profile.links[key]
        }

        setFormState(newFormState)
    }, [])

    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="first_name" value={formState["first_name"]} onChange={handleChange} className="form-control"/>
                </div>
                
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="last_name" value={formState["last_name"]} onChange={handleChange} className="form-control"/>
                </div>
                
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={formState["username"]} onChange={handleChange} className="form-control"/>
                </div>
                
                <div className="form-group">
                    <label>Biography</label>
                    <textarea name="biography" value={formState["biography"]} onChange={handleChange} className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Avatar</label>
                    <input type="file" ref={avatarRef} className="form-control-file"/>
                </div>
                
                <div className="form-group">
                    <label>Github</label>
                    <input type="text" name="github" value={formState["github"]} onChange={handleChange} className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Website</label>
                    <input type="text" name="website" value={formState["website"]} onChange={handleChange} className="form-control" />
                </div>
                
                <input type="submit" value="Save Changes" className="btn btn-primary"/> 
            </form>
        </div>
    )
}

export default EditProfilePage
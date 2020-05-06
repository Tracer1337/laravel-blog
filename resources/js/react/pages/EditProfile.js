import React, { useState } from "react"
import { connect } from "react-redux"
import MarkdownEditor from "react-simplemde-editor"
import { useForm, Controller } from "react-hook-form"
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoOutlined"
import SaveIcon from "@material-ui/icons/Save"

import "easymde/dist/easymde.min.css"

import FileInput from "../components/FileInput.js"

import objectToForm from "../utils/objectToForm.js"
import { editProfile } from "../config/API.js"
import { modifyProfile } from "../redux/actions.js"

const links = ["Github", "Website", "Twitter", "Instagram"]

const EditProfile = ({ profile, modifyProfile }) => {
    const { register, handleSubmit, control } = useForm()
    const [avatar, setAvatar] = useState()
    
    const onSubmit = data => {
        const formData = {...data}
        formData.avatar = avatar

        editProfile(objectToForm(formData))
            .then(res => {
                modifyProfile(res.data.data)
                alert("Saved")
            })
    }

    const handleAvatarChange = file => setAvatar(file)

    return (
        <div className="form-page">
            <main>
                <h3 className="title">Edit Profile</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="Username" className="input" defaultValue={profile.username} ref={register()}/>
                    </div>

                    <div>
                        <label htmlFor="biography">Biography</label>
                        <Controller as={MarkdownEditor} name="biography" className="markdown-editor" control={control} defaultValue={profile.biography}/>
                    </div>

                    <FileInput label="Upload Avatar" icon={AddAPhotoIcon} onChange={handleAvatarChange} accept="image/*"/>

                    <div className="links">
                        {links.map((name, i) => (
                            <input type="text" name={name} defaultValue={profile.links?.[name]} placeholder={name} ref={register()} key={i}/>
                        ))}
                    </div>

                    <button type="submit" className="submit">
                        <SaveIcon className="icon"/>
                        <span>Save</span>
                    </button>
                </form>
            </main>
        </div>
    )
}

const mapStateToProps = store => ({
    profile: store.auth.profile
})

export default connect(mapStateToProps, { modifyProfile })(EditProfile)
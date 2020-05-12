import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"
import MarkdownEditor from "react-simplemde-editor"
import { useForm, Controller } from "react-hook-form"
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoOutlined"
import SaveIcon from "@material-ui/icons/Save"

import "easymde/dist/easymde.min.css"

import FileInput from "../components/FileInput.js"
import Auth from "../components/Auth.js"

import objectToForm from "../utils/objectToForm.js"
import { editProfile } from "../config/API.js"
import { modifyProfile } from "../redux/actions.js"
import useAPIData from "../utils/useAPIData.js"
import pageTitle from "../config/pageTitle.js"

const EditProfile = ({ profile, modifyProfile }) => {
    const { register, handleSubmit, control } = useForm()

    const [avatar, setAvatar] = useState()

    const [availableLinks] = useAPIData("getAvailableLinks")
    
    const onSubmit = data => {
        const formData = {...data}
        formData.avatar = avatar

        // Format links to JSON array
        const formattedLinks = {}
        availableLinks.forEach(key => {
            if(formData[key]) {
                formattedLinks[key] = formData[key]
                delete formData[key]
            }
        })
        formData.links = JSON.stringify(formattedLinks)

        editProfile(objectToForm(formData))
            .then(res => {
                modifyProfile(res.data.data)
                alert("Saved")
            })
    }

    const handleAvatarChange = file => setAvatar(file)

    return (
        <div className="form-page">
            <Helmet>
                <title>{pageTitle("Edit Profile")}</title>
            </Helmet>

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

                    <Auth role={["author"]}>
                        <FileInput label="Upload Avatar" icon={AddAPhotoIcon} onChange={handleAvatarChange} accept="image/*"/>
                    </Auth>

                    <div className="links">
                        {availableLinks && availableLinks.map((name, i) => (
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
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import Loadable from "react-loadable"
import Skeleton from "react-loading-skeleton"

import "easymde/dist/easymde.min.css"

import FileInput from "../components/FileInput.js"
import Auth from "../components/Auth.js"
import Dialog from "../components/Dialog/Dialog.js"
import Icon from "../components/Icon.js"

import objectToForm from "../utils/objectToForm.js"
import { editProfile } from "../config/API.js"
import { modifyProfile } from "../redux/actions.js"
import pageTitle from "../config/pageTitle.js"

const MarkdownEditor = Loadable({
    loader: () => import("react-simplemde-editor"),
    loading: Skeleton
})

const EditProfile = ({ profile, modifyProfile, availableLinks }) => {
    const { register, handleSubmit, control } = useForm()

    const [avatar, setAvatar] = useState()
    
    const onSubmit = data => {
        // Remove "null" value from biography
        if(data.biography === null) {
            delete data.biography
        }

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
                Dialog.success("Saved")
            })
            .catch(() => {
                Dialog.error("Failed")
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
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" name="first_name" placeholder="First Name" className="input" defaultValue={profile.first_name} ref={register()}/>
                    </div>

                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" name="last_name" placeholder="Last Name" className="input" defaultValue={profile.last_name} ref={register()}/>
                    </div>

                    <div>
                        <label htmlFor="biography">Biography</label>
                        <Controller as={MarkdownEditor} name="biography" className="markdown-editor" control={control} defaultValue={profile.biography}/>
                    </div>

                    <Auth role={["author"]}>
                        <FileInput label="Upload Avatar" icon="add-a-photo" onChange={handleAvatarChange} accept="image/*"/>
                    </Auth>

                    <div className="links">
                        {!availableLinks ? (
                            Array(4).fill().map((_, i) => <Skeleton width={450} height={45} key={i}/>)
                        ) : (
                            availableLinks.map((name, i) => (
                                <input type="text" name={name} defaultValue={profile.links?.[name]} placeholder={name} ref={register()} key={i} />
                            )
                        ))}
                    </div>

                    <button type="submit" className="submit">
                        <Icon type="save" className="icon"/>
                        <span>Save</span>
                    </button>
                </form>
            </main>
        </div>
    )
}

const mapStateToProps = store => ({
    profile: store.auth.profile,
    availableLinks: store.serverConfig.available_link_keys
})

export default connect(mapStateToProps, { modifyProfile })(EditProfile)
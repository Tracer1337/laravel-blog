import React, { useState } from "react"
import { useForm, Controller, FormContext } from "react-hook-form"
import MarkdownEditor from "react-simplemde-editor"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"

import TopicSelection from "./TopicSelection.js"
import TagSelection from "./TagSelection.js"
import FileInput from "../FileInput.js"
import ImageUpload from "./ImageUpload.js"
import AvailableImages from "./AvailableImages.js"
import Actions from "./Actions.js"

import { addBlogpost, editBlogpost } from "../../config/API.js"
import objectToForm from "../../utils/objectToForm.js"

const Form = ({ postId, editData }) => {
    const { register, control, getValues, setValue } = useForm((function() {
        if(editData) {
            const newValues = {...editData}
            delete newValues.images
            return {
                defaultValues: newValues
            }
        }
    })())

    const [availableImages, setAvailableImages] = useState(editData?.images && JSON.parse(editData.images))

    const transformValues = () => {
        const values = getValues()

        values.topic_id = values.topic_id?.value || editData?.topic_id
        values.tag_ids = values.tag_ids?.map(selection => selection.value)

        return objectToForm(values)
    }
    
    const handleSubmit = async method => {
        const formData = transformValues()

        if (method === 1) {
            formData.append("publish", true)
        }

        const msg = method === 1 ? "Published" : "Saved"
        let res

        if (postId) {
            formData.append("id", postId)
            res = await editBlogpost(formData)
        } else {
            res = await addBlogpost(formData)
        }

        alert(msg)

        if(res.data.data.images) {
            setAvailableImages(JSON.parse(res.data.data.images))
        }
    }

    return (
        <FormContext {...{ register, setValue }}>
            <form onSubmit={e => e.preventDefault()}>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Title" className="input" ref={register()}/>
                </div>

                <TopicSelection control={control} defaultValue={editData?.topic}/>

                <div>
                    <label>Teaser</label>
                    <input type="text" name="teaser" placeholder="Teaser" className="input" ref={register()}/>
                </div>

                <FileInput accept="image/*" name="cover" label="Upload Cover" icon={AddPhotoAlternateIcon} useHooks/>

                <div>
                    <label>Content</label>
                    <Controller as={MarkdownEditor} name="content" className="markdown-editor" control={control}/>
                </div>

                {availableImages && (
                    <AvailableImages data={availableImages}/>
                )}

                <ImageUpload/>

                <TagSelection control={control} defaultValue={editData?.tags}/>

                <Actions onSubmit={handleSubmit} editData={editData}/>
            </form>
        </FormContext>
    )
}

export default Form
import React from "react"
import { useForm, Controller, FormContext } from "react-hook-form"
import MarkdownEditor from "react-simplemde-editor"
import SaveIcon from "@material-ui/icons/Save"
import SendIcon from "@material-ui/icons/Send"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"

import TopicSelection from "./TopicSelection.js"
import TagSelection from "./TagSelection.js"
import FileInput from "../FileInput.js"

import { addBlogpost, editBlogpost } from "../../config/API.js"
import objectToForm from "../../utils/objectToForm.js"

const Form = ({ postId, editData }) => {
    const { register, control, getValues, setValue } = useForm({
        defaultValues: editData
    })

    const transformValues = () => {
        const values = getValues()

        values.topic_id = values.topic_id?.value || editData?.topic_id
        values.tag_ids = values.tag_ids?.map(selection => selection.value)

        return objectToForm(values)
    }
    
    const handleSubmit = method => {
        const formData = transformValues()

        if (method === 1) {
            formData.append("publish", true)
        }

        const msg = method === 1 ? "Published" : "Saved"

        if (postId) {
            formData.append("id", postId)
            editBlogpost(formData)
                .then(() => alert(msg))
        } else {
            addBlogpost(formData)
                .then(() => alert(msg))
        }
    }

    return (
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

            <FormContext {...{ register, setValue }}>
                <FileInput accept="image/*" name="cover" label="Upload Cover" icon={AddPhotoAlternateIcon} useHooks />
            </FormContext>

            <div>
                <label>Content</label>
                <Controller as={MarkdownEditor} name="content" className="markdown-editor" control={control}/>
            </div>

            <TagSelection control={control} defaultValue={editData?.tags}/>

            <div className="actions">
                <button className="submit" onClick={() => handleSubmit(0)}>
                    <SaveIcon className="icon"/>
                    <span>Save</span>
                </button>

                <button className="submit" onClick={() => handleSubmit(1)} disabled={!!editData?.published_at}>
                    <SendIcon className="icon"/>
                    <span>Publish</span>
                </button> {/* Seperate File - Component */}
            </div>
        </form>
    )
}

export default Form
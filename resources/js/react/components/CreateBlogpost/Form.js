import React from "react"
import ReactDOMServer from "react-dom/server"
import { useHistory } from "react-router-dom"
import { useForm, Controller, FormContext } from "react-hook-form"
import MarkdownEditor from "react-simplemde-editor"

import TopicSelection from "./TopicSelection.js"
import TagSelection from "./TagSelection.js"
import FileInput from "../FileInput.js"
import ImageUpload from "./ImageUpload.js"
import AvailableAssets from "./AvailableAssets.js"
import Actions from "./Actions.js"
import Preview from "./Preview.js"
import Dialog from "../Dialog/Dialog.js"
import MarkdownViewer from "../MarkdownViewer.js"

import { addBlogpost, editBlogpost } from "../../config/API.js"
import objectToForm from "../../utils/objectToForm.js"

const Form = ({ postId, editData, reload }) => {
    const history = useHistory()

    const { register, control, getValues, setValue } = useForm({ defaultValues: editData })

    const transformValues = () => {
        const values = getValues()

        values.topic_id = values.topic_id?.value || editData?.topic_id
        values.tag_ids = values.tag_ids?.map(selection => selection.value)

        // Remove null values
        for(let key in values) {
            if(values[key] === null) {
                values[key] = undefined
            }
        }

        return objectToForm(values)
    }
    
    const handleSubmit = async method => {
        const formData = transformValues()

        if (method === 1) {
            formData.append("publish", true)
        }

        try {
            if (postId) {
                formData.append("id", postId)
                await editBlogpost(formData)
                reload()
            } else {
                const res = await addBlogpost(formData)
                history.push("/create-post?post_id=" + res.data.data.id)
            }
        } catch {
            Dialog.error("Request failed")
            return
        }

        Dialog.success(method === 1 ? "Published" : "Saved")
    }
    
    return (
        <FormContext {...{ register, setValue }}>
            <div className="create-blogpost-form">
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

                    {postId && (
                        <FileInput accept="image/*" name="cover" label="Upload Cover" icon="add-a-photo-alternate" useHooks/>
                    )}

                    <div>
                        <label>Content</label>
                        <Controller as={MarkdownEditor} name="content" className="markdown-editor" control={control} options={{
                            previewRender: text => ReactDOMServer.renderToStaticMarkup(<MarkdownViewer source={text}/>)
                        }}/>
                    </div>

                    {editData?.assets && (
                        <AvailableAssets data={editData.assets} onRemove={reload}/>
                    )}

                    {postId && <ImageUpload/>}

                    <TagSelection control={control} defaultValue={editData?.tags}/>

                    <Actions onSubmit={handleSubmit} editData={editData}/>
                </form>

                <Preview data={editData}/>
            </div>
        </FormContext>
    )
}

export default Form
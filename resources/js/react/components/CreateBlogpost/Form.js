import React, { useState, useEffect } from "react"
import ReactDOMServer from "react-dom/server"
import { useHistory, Prompt } from "react-router-dom"
import { useForm, Controller, FormContext } from "react-hook-form"
import Loadable from "react-loadable"
import Skeleton from "react-loading-skeleton"

import TopicSelection from "./TopicSelection.js"
import TagSelection from "./TagSelection.js"
import FileInput from "../FileInput.js"
import AssetUpload from "./AssetUpload.js"
import AvailableAssets from "./AvailableAssets.js"
import Actions from "./Actions.js"
import Preview from "./Preview.js"
import Dialog from "../Dialog/Dialog.js"
import MarkdownViewer from "../MarkdownViewer.js"
import ProgressBar from "../ProgressBar.js"

import { addBlogpost, editBlogpost } from "../../config/API.js"
import objectToForm from "../../utils/objectToForm.js"
import { gaEvent } from "../../utils/GATracking.js"

const MarkdownEditor = Loadable({
    loader: () => import("../MarkdownEditor.js"),
    loading: Skeleton
})

const Form = ({ postId, editData, reload }) => {
    const history = useHistory()

    const { register, control, getValues, setValue, formState } = useForm({
        defaultValues: (function() {
            const defaultValues = {...editData}
            delete defaultValues.assets
            return defaultValues
        })()
    })

    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

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

    const handleUploadProgress = ({ loaded, total }) => {
        setProgress(loaded / total)
    }
    
    const handleSubmit = async (method = 0) => {
        const formData = transformValues()

        let successMessage = "Saved"

        if (method === 1) {
            formData.append("publish", true)
            successMessage = "Published"

        } else if (method === 2) {
            formData.append("unpublish", true)
            successMessage = "Unpublished"
        }

        setIsLoading(true)
        setProgress(0)

        try {
            if (postId) {
                gaEvent({
                    category: "Blogpost",
                    action: "Edit",
                    label: postId
                })

                formData.append("id", postId)
                await editBlogpost(formData, handleUploadProgress)
                reload()
            } else {
                gaEvent({
                    category: "Blogpost",
                    action: "Add"
                })

                const res = await addBlogpost(formData)
                history.push("/create-post?post_id=" + res.data.data.id)
            }
        } catch {
            Dialog.error("Request failed")
            return
        }

        setHasUnsavedChanges(false)
        setIsLoading(false)

        Dialog.success(successMessage)
    }

    useEffect(() => {
        // Show an alert on tab close if the user has unsaved changes
        function handleBeforeUnload(event) {
            if(hasUnsavedChanges) {
                event.returnValue = true
            }
        }

        // Save on ctrl + s
        function handleKeyPress(event) {
            if(event.keyCode === 83 && event.ctrlKey) {
                event.preventDefault()
                handleSubmit()
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload)

        window.addEventListener("keydown", handleKeyPress)

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
            window.removeEventListener("keydown", handleKeyPress)
        }
    }, [])

    useEffect(() => {
        setHasUnsavedChanges(formState.dirty)
    }, [formState.dirty])
    
    return (
        <FormContext {...{ register, setValue }}>
            <Prompt
                when={hasUnsavedChanges}
                message="You have unsaved changes"
            />

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

                    {postId && <AssetUpload/>}

                    <TagSelection control={control} defaultValue={editData?.tags}/>

                    {isLoading && <ProgressBar progress={progress}/>}

                    <Actions onSubmit={handleSubmit} editData={editData}/>
                </form>

                <Preview data={editData}/>
            </div>
        </FormContext>
    )
}

export default Form
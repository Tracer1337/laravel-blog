import React, { useMemo, useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Skeleton from "react-loading-skeleton"
import Select from "react-select"
import { useHistory, useLocation } from "react-router-dom"

import Pagination from "../components/Pagination.js"
import BlogpostCard from "../components/BlogpostCard.js"

import useAPIData from "../utils/useAPIData.js"
import useQuery from "../utils/useQuery.js"
import pageTitle from "../config/pageTitle.js"

const TagPage = () => {
    const history = useHistory()
    const location = useLocation()

    const tagIds = useQuery("tag_ids", true)

    const [selectedTags, setSelectedTags] = useState()
    const [forceReloadKey, setForceReloadKey] = useState(0)
    const [lastSearch, setLastSearch] = useState("")

    const forceReload = () => setForceReloadKey(forceReloadKey + 1)

    const [data] = useAPIData({
        method: "getAllTags"
    })

    const tagNames = useMemo(() => {
        return data?.data.filter(tag => tagIds.some(id => id == tag.id)).map(tag => tag.name)
    }, [data, tagIds])

    const options = useMemo(() => {
        if(!data) {
            return null
        }

        const newOptions = []
        for(let tag of data.data) {
            newOptions.push({
                label: tag.name,
                value: tag.id
            })
        }

        return newOptions
    }, [data])

    useEffect(() => {
        const defaultValue = options?.filter(opt => tagIds.some(id => id == opt.value))
        setSelectedTags(defaultValue)
    }, [options])

    useEffect(() => {
        if(!selectedTags) {
            return
        }

        const searchParams = new URLSearchParams(history.location.search)
        searchParams.delete("tag_ids")

        for (let option of selectedTags) {
            searchParams.append("tag_ids", option.value)
        }

        const newUrl = `${history.location.pathname}?${searchParams.toString()}`
        history.replace(newUrl)
    }, [selectedTags])

    useEffect(() => {
        if(lastSearch && location.search !== lastSearch) {
            forceReload()
        }

        setLastSearch(location.search)
    }, [location])

    const handleSelectionChange = values => {
        if(values?.length) {
            setSelectedTags(values)
        }
    }

    return (
        <div className="tag-page">
            <Helmet>
                <title>{pageTitle(tagNames?.join(", "))}</title>
            </Helmet>

            <div className="head">
                {!options ? <Skeleton /> : (
                    <Select
                        options={options}
                        isMulti
                        className="select-container"
                        classNamePrefix="select"
                        placeholder="Filter By Tags"
                        value={selectedTags}
                        onChange={handleSelectionChange}
                    />
                )}
            </div>

            <Pagination
                className="paginated-blogposts"
                fetchMethod="getTagsBlogposts"
                args={[tagIds]}
                key={forceReloadKey}
                renderChildren={({ data, isLoading }) => {
                    if (!isLoading) {
                        return data.map((post, i) => (
                            <BlogpostCard post={post} key={i} />
                        ))
                    } else {
                        return Array(20).fill().map((_, i) => <BlogpostCard showSkeleton key={i} />)
                    }
                }}
            />
        </div>
    )
}

export default TagPage
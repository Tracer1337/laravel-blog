import React, { useState, useEffect, useImperativeHandle } from "react"
import { Pagination as MuiPagination } from "@material-ui/lab"

import useAPIData from "../utils/useAPIData.js"

const Pagination = ({ fetchMethod, renderChildren, className, args = [], useCache = false }, ref) => {
    const [data, refresh] = useAPIData(fetchMethod, [...args, 1], useCache)
    const [pageNr, setPageNr] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    const loadPage = async () => {
        window.scrollTo(0, 0)
        setIsLoading(true)
        await refresh([...args, pageNr])
        setIsLoading(false)
    }

    const handlePageChange = (event, value) => {
        setPageNr(value)
    }

    useEffect(() => {
        loadPage()
    }, [pageNr, fetchMethod])

    useImperativeHandle(ref, () => ({ 
        refresh: loadPage
     }))
    
    return (
        <div className={`paginated ${className}`}>
            <div className="items">
                {React.createElement(renderChildren, {
                    data: data?.data,
                    isLoading
                })}
            </div>
            
            {!isLoading && (
                <MuiPagination count={data.meta.last_page} page={data.meta.current_page} onChange={handlePageChange} className="pagination-links"/>
            )}
        </div>
    )
}

export default React.forwardRef(Pagination)
import React, { useState, useEffect } from "react"
import { Pagination as MuiPagination } from "@material-ui/lab"

const Pagination = ({ fetchMethod, renderChildren, className }) => {
    const [data, setData] = useState()
    const [pageNr, setPageNr] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    const loadPage = () => {
        window.scrollTo(0, 0)
        setIsLoading(true)
        fetchMethod(pageNr)
            .then(res => {
                setData(res.data)
                setIsLoading(false)
            })
    }

    const handlePageChange = (event, value) => {
        setPageNr(value)
    }

    useEffect(() => {
        loadPage()
    }, [pageNr, fetchMethod])
    
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

export default Pagination
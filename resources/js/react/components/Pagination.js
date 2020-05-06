import React, { useState, useEffect } from "react"
import { Pagination as MuiPagination } from "@material-ui/lab"

const Pagination = ({ fetchMethod, child }) => {
    const [data, setData] = useState()
    const [pageNr, setPageNr] = useState(1)

    const loadPage = () => {
        fetchMethod(pageNr)
            .then(res => setData(res.data))
    }

    const handlePageChange = (event, value) => {
        setPageNr(value)
    }

    useEffect(() => loadPage(), [pageNr, fetchMethod])

    if(!data) {
        return <></>
    }
    
    return (
        <div className="paginated">
            <div className="items">
                {React.createElement(child, {
                    data: data.data
                })}
            </div>

            <MuiPagination count={data.meta.last_page} page={data.meta.current_page} onChange={handlePageChange} className="pagination-links"/>
        </div>
    )
}

export default Pagination
import React, { useState, useEffect, useImperativeHandle } from "react"

import Icon from "./Icon.js"

import useAPIData from "../utils/useAPIData.js"

const Navigation = ({ count, page, onChange }) => {
    const handlePrevious = () => {
        if(page > 0) {
            onChange(page - 1)
        }
    }

    const handleNext = () => {
        if(page < count) {
            onChange(page + 1)
        }
    }

    const handleGoto = i => {
        onChange(i)
    }

    return (
        <nav className="pagination-nav">
            <ul>
                <li>
                    <button className={page === 1 ? "disabled" : null} onClick={handlePrevious}>
                        <Icon type="chevron-left"  fontSize="small"/>
                    </button>
                </li>

                {Array(count).fill().map((_, i) => (
                    <li key={i}>
                        <button 
                            className={i + 1 === page ? "current" : ""} 
                            onClick={handleGoto.bind(null, i + 1)}
                        >
                            {i + 1}
                        </button>
                    </li>
                ))}

                <li>
                    <button className={page === count ? "disabled" : null} onClick={handleNext}>
                        <Icon type="chevron-right"  fontSize="small"/>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

const Pagination = ({ fetchMethod, renderChildren, className, args = [], useCache = false }, ref) => {
    const [data, refresh] = useAPIData({
        method: fetchMethod,
        args: [...args, 1],
        cache: useCache,
        initialLoad: false
    })
    const [pageNr, setPageNr] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    const loadPage = async () => {
        window.scrollTo(0, 0)
        setIsLoading(true)
        await refresh([...args, pageNr], true)
        setIsLoading(false)
    }

    const handlePageChange = (value) => {
        setPageNr(value)
    }

    useEffect(() => {
        loadPage()
    }, [pageNr, fetchMethod])

    useImperativeHandle(ref, () => ({ 
        refresh: loadPage
     }))
    
    return (
        <div className={`paginated ${className || ""}`}>
            <div className="items">
                {React.createElement(renderChildren, {
                    data: data?.data,
                    isLoading
                })}
            </div>

            {!isLoading && (
                <Navigation count={data.meta.last_page} page={data.meta.current_page} onChange={handlePageChange}/>
            )}
        </div>
    )
}

export default React.forwardRef(Pagination)
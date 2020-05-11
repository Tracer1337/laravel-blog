import React from "react"
import { Helmet } from "react-helmet"

import HorizontalScrollablePosts from "../components/HorizontalScrollablePosts.js"
import Topics from "../components/Topics.js"
import Tags from "../components/Tags.js"

import useQuery from "../utils/useQuery.js"
import useAPIData from "../utils/useAPIData.js"
import pageTitle from "../config/pageTitle.js"

const SearchPage = () => {
    const query = useQuery("query")
    const [data] = useAPIData("getSearchResults", [query], false)

    return (
        <div className="search-page">
            <Helmet>
                <title>{pageTitle("Search")}</title>
            </Helmet>

            <h3 className="title center">Results for: {query}</h3>

            {data && (
                <div>
                    <section>
                        <h3 className="title">Posts</h3>
                        <HorizontalScrollablePosts posts={data.blogposts}/>
                    </section>

                    <div className="spacer"/>

                    <section>
                        <h3 className="title">Topics</h3>
                        <Topics data={data.topics}/>
                    </section>

                    <div className="spacer"/>

                    <section>
                        <h3 className="title">Tags</h3>
                        <Tags data={data.tags}/>
                    </section>
                </div>
            )}
        </div>
    )
}

export default SearchPage
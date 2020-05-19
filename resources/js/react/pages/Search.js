import React from "react"
import { Helmet } from "react-helmet"

import HorizontalScrollablePosts from "../components/HorizontalScrollablePosts.js"
import Topics from "../components/Topics.js"
import Tags from "../components/Tags.js"
import UserCard from "../components/UserCard.js"

import useQuery from "../utils/useQuery.js"
import useAPIData from "../utils/useAPIData.js"
import pageTitle from "../config/pageTitle.js"

const SearchPage = () => {
    const query = useQuery("query")
    let [data] = useAPIData({
        method: "getSearchResults",
        args: [query],
        cache: false
    })
    
    if(!data) {
        data = {}
    }

    const authors = data.authors || Array(5).fill({})

    return (
        <div className="search-page">
            <Helmet>
                <title>{pageTitle("Search")}</title>
            </Helmet>

            <h3 className="title center">Results for: {query}</h3>

            <div>
                <section>
                    <h3 className="title">Posts</h3>
                    <HorizontalScrollablePosts posts={data.blogposts}/>
                </section>

                <div className="spacer"/>

                <section>
                    <h3 className="title">Authors</h3>
                    {authors.map((user, i) => <UserCard data={user} key={user.id || i}/>)}
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
        </div>
    )
}

export default SearchPage
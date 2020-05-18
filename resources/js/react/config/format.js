export const blogpost = "blogpost"
export const blogposts = "blogposts"
export const search = "search"
export const user = "user"

const formatBlogpost = post => {
    // Create assets
    if (!post.assets) {
        post.assets = []
    } else {
        // Create meta of assets
        post.assets.forEach(asset => {
            if (!asset.meta) {
                asset.meta = {}
            } else {
                asset.meta = JSON.parse(asset.meta)
            }
        })
    }
}

const formatSearch = data => {
    // Format all blogposts
    data.blogposts.forEach(formatBlogpost)
}

const formatUser = data => {
    // Format all blogposts
    data.recommendations.forEach(formatBlogpost)
}

const format = type => {
    let f
    if (type === blogpost) {
        f = res => formatBlogpost(res.data.data)
    } else if (type === blogposts) {
        f = res => res.data.data.forEach(formatBlogpost)
    } else if (type === search) {
        f = res => formatSearch(res.data)
    } else if (type === user) {
        f = res => formatUser(res.data.data)
    }

    return res => {
        f(res)
        return res
    }
}

export default format
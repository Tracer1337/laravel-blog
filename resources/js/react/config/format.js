export const blogpost = "blogpost"
export const blogposts = "blogposts"
export const search = "search"

const formatBlogpost = post => {
    if (!post.assets) {
        post.assets = []
    } else {
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
    data.blogposts.forEach(formatBlogpost)
}

const format = type => {
    let f
    if (type === blogpost) {
        f = res => formatBlogpost(res.data.data)
    } else if (type === blogposts) {
        f = res => res.data.data.forEach(formatBlogpost)
    } else if (type === search) {
        f = res => formatSearch(res.data)
    }

    return res => {
        f(res)
        return res
    }
}

export default format
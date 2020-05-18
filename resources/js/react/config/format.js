export const blogpost = "blogpost"
export const blogposts = "blogposts"
export const search = "search"
export const user = "user"
export const auth = "auth"
export const assets = "assets"

const formatBlogpost = post => {
    // Format user
    if(post.user) {
        formatUser(post.user)
    }

    // Format comment's users
    if(post.comments) {
        post.comments.forEach(comment => formatUser(comment.user))
    }

    // Create assets
    if (!post.assets) {
        post.assets = []
    } else {
        post.assets.forEach(formatAsset)
    }
}

const formatSearch = data => {
    // Format all blogposts
    data.blogposts.forEach(formatBlogpost)
}

const formatUser = data => {
    data.full_name = data.first_name + " " + data.last_name
    
    // Format all blogposts
    if(data.recommendations) {
        data.recommendations.forEach(formatBlogpost)
    } else {
        data.recommendations = []
    }
}

const formatAsset = data => {
    if(data.user) {
        formatUser(data.user)
    }

    if(data.blogpost) {
        formatBlogpost(data.blogpost)
    }

    // Create meta of assets
    if (!data.meta) {
        data.meta = {}
    } else {
        data.meta = JSON.parse(data.meta)
    }
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
    } else if (type === auth) {
        f = res => formatUser(res.data.profile)
    } else if (type === assets) {
        f = res => res.data.data.forEach(formatAsset)
    }

    return res => {
        f(res)
        return res
    }
}

export default format